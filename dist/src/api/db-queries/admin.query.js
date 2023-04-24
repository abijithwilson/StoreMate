"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOfferQuery = exports.deleteSectionQuery = exports.singleOfferProductUnassignQuery = exports.singleOfferProductAssignQuery = exports.singleOfferProductListQuery = exports.storeAdminInviteQuery = exports.deleteStoreAdminQuery = exports.statementQuery = exports.DeleteStoresQuery = exports.AssignedStoresQuery = exports.StoreAdminProfileUpdateQuery = exports.StoreAdminProfileFetchQuery = exports.listAllStoreAdminQuery = exports.fetchAdminProfile = void 0;
const K = require("../../shared/constants");
exports.fetchAdminProfile = `SELECT admin_id, first_name, last_name,
 email, m_role.role_id, m_role.role_name, phone, countries.country_id, 
 countries.country_name, states.state_id, states.state_name, address, image,
   updated_by, updated_at FROM m_admin
INNER JOIN countries
ON m_admin.country_id = countries.country_id
INNER JOIN states
ON m_admin.state_id = states.state_id
INNER JOIN m_role
ON m_role.role_id = m_admin.role_id
WHERE m_admin.admin_id = $1 AND m_admin.is_deleted = false`;
const listAllStoreAdminQuery = (adminName, storeName, countryId, stateId, districtId, limit, offset) => {
    const dataValue = [
        adminName ? adminName : null,
        storeName ? storeName : null,
        countryId ? countryId : null,
        stateId ? stateId : null,
        districtId ? districtId : null
    ];
    return {
        query: `SELECT
a.admin_id,
a.first_name,
a.last_name,
COALESCE(json_agg(jsonb_build_object(
                'storeId',ms.store_id, 
                'storeName',concat(ms.store_name, ' - ', d.district_name),
                'districtId',d.district_id
            )) FILTER (WHERE ms.store_id  IS NOT NULL), '[]')AS stores,
count(*) over()
FROM m_admin a
LEFT JOIN t_admin_store_map tasm
ON a.admin_id  = tasm.admin_id 
LEFT JOIN m_store ms
ON tasm.store_id = ms.store_id 
LEFT JOIN districts d
ON ms.district_id = d.district_id
LEFT JOIN m_role mr
ON a.role_id = mr.role_id
WHERE a.is_deleted = false
AND mr.role_name='${K.STORE_ADMIN}' AND ($1::text is null or UPPER(first_name) 
    LIKE UPPER('%${adminName}%')) AND 
    ($2::text is null or UPPER(ms.store_name) 
    LIKE UPPER('%${storeName}%'))      
    AND ($3::text is null or ms.country_id IN (${countryId ? JSON.parse(countryId).join(',') : null}))  
    AND ($4::text is null or ms.state_id IN (${stateId ? JSON.parse(stateId).join(',') : null})) 
    AND ($5::text is null or ms.district_id IN (${districtId ? JSON.parse(districtId).join(',') : null})) 
group by a.admin_id 
ORDER by a.updated_at DESC
    ${limit ? `limit ${limit}` : ''}
    ${offset ? `offset ${offset}` : ''}
`,
        dataValue: dataValue
    };
};
exports.listAllStoreAdminQuery = listAllStoreAdminQuery;
exports.StoreAdminProfileFetchQuery = `select  
m_admin.admin_id ,
m_admin.first_name ,
m_admin.last_name ,
m_admin.email ,
m_admin.phone ,
m_admin.address,
m_admin.image ,
m_admin.state_id ,
m_admin.country_id,
countries.country_name,
states.state_name,
COALESCE(json_agg(jsonb_build_object(
            'storeId',ms.store_id,
            'storeName',concat(ms.store_name, ' - ', d.district_name),
            'districtId',d.district_id
            )) FILTER (WHERE ms.store_id  IS NOT NULL), '[]')AS stores
from m_admin  
LEFT JOIN t_admin_store_map tasm
ON m_admin.admin_id  = tasm.admin_id 
LEFT JOIN m_store ms
ON tasm.store_id = ms.store_id  
LEFT JOIN countries ON m_admin.country_id= countries.country_id
LEFT JOIN states ON m_admin.state_id= states.state_id
LEFT JOIN districts d ON ms.district_id = d.district_id
where m_admin.admin_id = $1 and role_id = 2
AND m_admin.is_deleted = false
GROUP by m_admin.admin_id ,tasm.admin_id,countries.country_name,
states.state_name
`;
exports.StoreAdminProfileUpdateQuery = `WITH updateTable AS (
   UPDATE m_admin
   SET phone =COALESCE($2,phone),
       country_id =COALESCE($3,country_id),
       state_id=COALESCE($4,state_id),
       address=COALESCE($5,address),
       updated_by=COALESCE($6,updated_by),
       first_name=COALESCE($7,first_name),
       last_name=COALESCE($8,last_name),
       updated_at=CURRENT_TIMESTAMP
   WHERE admin_id=$1 AND is_deleted = false
   )`;
const AssignedStoresQuery = (assignedStoreIdValues) => `insert_stores AS (INSERT INTO
   t_admin_store_map (admin_id,store_id)
   values($1, unnest(array[ 
  ${assignedStoreIdValues} 
  ])))`;
exports.AssignedStoresQuery = AssignedStoresQuery;
const DeleteStoresQuery = (unAssignedStoreIdValues) => `delete_stores AS (
   DELETE FROM t_admin_store_map WHERE store_id IN (
  ${unAssignedStoreIdValues} 
  )  and admin_id=$1
   )`;
exports.DeleteStoresQuery = DeleteStoresQuery;
exports.statementQuery = ` SELECT admin_id
    FROM t_admin_store_map
    WHERE admin_id=$1`;
const deleteStoreAdminQuery = (idString) => `
WITH 
delete_store_admin AS
(
  DELETE FROM t_admin_store_map WHERE admin_id IN (${idString})
)
UPDATE m_admin SET is_deleted = true WHERE admin_id 
IN (${idString}) returning admin_id
`;
exports.deleteStoreAdminQuery = deleteStoreAdminQuery;
const storeAdminInviteQuery = (assignedStoreIdValues) => `WITH insertStoreAdmin AS(
  INSERT INTO m_admin(first_name, email, updated_by) 
  VALUES($1, $2, $3) RETURNING admin_id)
  INSERT INTO t_admin_store_map(admin_id,store_id)
   values((SELECT admin_id FROM insertStoreAdmin), unnest(array[ 
  ${assignedStoreIdValues}
  ])) RETURNING admin_id
`;
exports.storeAdminInviteQuery = storeAdminInviteQuery;
const singleOfferProductListQuery = (limit, offset, sortField, sortOrder, filterCategory, assigned) => {
    let i = 0;
    const dataValue = [];
    if (filterCategory) {
        dataValue.push(...JSON.parse(filterCategory));
    }
    return {
        query: `
    select 
    mp.id as product_id,
    mst.id as sku_id,
    mp.product_name,
    mp.category_id,
    mc.name,
    mst.image as product_image,
    mst.base_price,
    mst.sale_price_discount_percent,
    count(*) over()
    from m_product mp 
    left join m_sku_table mst
    on mp.id = mst.product_id 
    left join m_category mc
    on mp.category_id = mc.id
    where mst.default_product = true 
    and ${assigned === 'true' ? '' : 'not '}exists (select id from t_product_offer_map tpom
             where tpom.product_id = mp.id and tpom.offer_id = $${++i}) 
             and mp.is_deleted=false
${filterCategory ?
            `and mp.category_id in (
        ${dataValue.map(() => {
                return `$${++i}`;
            })})` :
            ''}
ORDER BY 
${sortField ? K.SECTION_PRODUCT_LIST_SORT[sortField] : 'mp.updated_at'} 
    ${sortOrder ? K.SORT_ORDER[sortOrder] : 'DESC'}
${limit ? `limit ${limit}` : ''}
${offset ? `offset ${offset}` : ''}
`,
        dataValue: dataValue
    };
};
exports.singleOfferProductListQuery = singleOfferProductListQuery;
const singleOfferProductAssignQuery = (assignedProductIdValues) => `insert into
t_product_offer_map (offer_id,product_id)
values($1, unnest(array[ 
${assignedProductIdValues}
]))`;
exports.singleOfferProductAssignQuery = singleOfferProductAssignQuery;
exports.singleOfferProductUnassignQuery = `
delete from t_product_offer_map 
where offer_id = $1 and product_id = $2 
returning id`;
exports.deleteSectionQuery = `
with deleteSectionInBeacon as (
  update m_beacon 
  set section_id =null 
  where section_id = $1
  returning beacon_id
  ),
  deleteBeaconFromSectionVisit as (
  delete from t_section_visit tsv
  where tsv.beacon_id = (select beacon_id
  from deleteSectionInBeacon)
  ),
  deleteSectionInProductMap as (
  update t_section_product_map  
  set section_id =null 
  where section_id = $1
  ),
  deleteSectionInStoreMap as (
  delete from t_store_section_map 
  where section_id =$1
  )
  update m_section  
  set is_deleted = true  
  where section_id = $1 and is_deleted = false
  returning section_id 
`;
exports.deleteOfferQuery = `
with deleteOffer as (
  update m_offer
  set is_deleted = true
  where offer_id = $1 and is_deleted = false
  returning offer_id
),
deleteFromProductMap as (
  delete from t_product_offer_map 
  where offer_id = (select offer_id from deleteOffer)
)
delete from t_offer_store_map 
where offer_id = (select offer_id from deleteOffer)
`;
//# sourceMappingURL=admin.query.js.map