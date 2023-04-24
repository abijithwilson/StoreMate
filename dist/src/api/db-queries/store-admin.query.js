"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchStoreDashboardDataQuery = exports.assignBeaconQuery = exports.fetchVisitorsCount = exports.unAssignBeaconQuery = exports.BeaconFetchQuery = exports.fetchSectionWiseProductsQuery = exports.fetchStoreAdminProfile = exports.fetchAssignedStores = void 0;
const K = require("../../shared/constants");
exports.fetchAssignedStores = `
SELECT 
ms.store_name AS name, 
ds.district_name AS place,
ms.store_id,
count(*) over()
from m_admin  
LEFT JOIN t_admin_store_map tasm
ON m_admin.admin_id  = tasm.admin_id 
LEFT JOIN m_store ms
ON tasm.store_id = ms.store_id
LEFT JOIN districts ds
ON ms.district_id = ds.district_id
where m_admin.admin_id = $1 
AND m_admin.is_active = true
AND role_id = 2
AND m_admin.is_deleted = false
ORDER by ms.updated_at DESC`;
exports.fetchStoreAdminProfile = `
select  
m_admin.admin_id,
m_admin.first_name,
m_admin.last_name,
m_admin.email,
m_admin.phone,
m_admin.address,
m_admin.image,
m_admin.state_id,
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
where m_admin.admin_id = $1 
AND m_admin.is_active = true
AND role_id = 2
AND m_admin.is_deleted = false
GROUP by m_admin.admin_id ,tasm.admin_id,countries.country_name,
states.state_name
`;
const fetchSectionWiseProductsQuery = (filterCategory, sortField, sortOrder, limit, offset) => {
    let i = 0;
    const dataValue = [];
    if (filterCategory) {
        dataValue.push(...JSON.parse(filterCategory));
    }
    return {
        query: `
select 
mp.id,
mst.image,
mp.product_name,
mp.category_id,
mc.name as category_name,
mst.base_price as price,
mst.sale_price_discount_percent,
mst.id as skuId,
mst.sku_unique_id,
count(*) over()
from m_product mp
left join m_category mc
on mp.category_id = mc.id
left join m_sku_table mst
on mp.id = mst.product_id
where mst.default_product = true
and exists (select id from t_section_product_map tspm
         where tspm.store_id = $${++i} and tspm.product_id = mp.id and
         tspm.section_id = $${++i}) and mp.is_deleted=false
         ${filterCategory ?
            `and mp.category_id in (
        ${dataValue.map(() => {
                return `$${++i}`;
            })})` :
            ''}
ORDER BY ${sortField ? K.SECTION_PRODUCT_LIST_SORT[sortField] : 'mp.updated_at'} 
    ${sortOrder ? K.SORT_ORDER[sortOrder] : 'DESC'}
${limit ? `limit ${limit}` : ''}
${offset ? `offset ${offset}` : ''}
`,
        dataValue: dataValue
    };
};
exports.fetchSectionWiseProductsQuery = fetchSectionWiseProductsQuery;
const BeaconFetchQuery = (limit, offset) => `
select 
mb.beacon_id ,
mb.name as name,
mb.major_id ,
mb.device_id,
mb.minor_id,
case when ms.section_name is null then '' else section_name end,
count(*) over()
from m_beacon mb
left join m_section ms 
on mb.section_id = ms.section_id and ms.is_deleted =false
where mb.store_id = $1 and 
($2::integer is null or mb.section_id = $2)
order by mb.updated_at DESC
${limit ? `limit ${limit}` : ''}
${offset ? `offset ${offset}` : ''}
`;
exports.BeaconFetchQuery = BeaconFetchQuery;
exports.unAssignBeaconQuery = `
  update m_beacon 
  set section_id = NULL,
  updated_at = CURRENT_TIMESTAMP
  where beacon_id = $1 and store_id = $2 	
  returning beacon_id
`;
exports.fetchVisitorsCount = `
select 
sum(case when mb.store_id = $1 and mb.section_id = $2 and
     entry_status = true and TO_CHAR(tsv.entry_date_time, 'YYYY-MM-DD') = 
TO_CHAR(current_timestamp , 'YYYY-MM-DD') then 1 else 0 end)
active_count,
(select count(distinct user_id) from t_section_visit tsv1
left join m_beacon mb ON tsv1.beacon_id = mb.beacon_id
where mb.store_id = $1 
and mb.section_id = $2 and TO_CHAR(tsv1.entry_date_time, 'YYYY-MM-DD') = 
TO_CHAR(current_timestamp , 'YYYY-MM-DD')) as 
total_count
from t_section_visit tsv
left join m_beacon mb ON tsv.beacon_id = mb.beacon_id
 `;
const assignBeaconQuery = (beaconId) => {
    let queryValue = 3;
    return `UPDATE m_beacon
 SET section_id = $1
 WHERE
  beacon_id in (${beaconId.map(() => {
        return `$${queryValue++}`;
    })}) and store_id=$2 returning beacon_id`;
};
exports.assignBeaconQuery = assignBeaconQuery;
exports.fetchStoreDashboardDataQuery = `
with fetchBeaconCount as (
  select count(beacon_id) as no_of_beacons
  from m_beacon mb
  where mb.store_id = $1)
select  
sum(case when tsv.entry_status = true then 1 else 0 end) as active_visitors,
count(distinct tsv.user_id) as total_visitors,
(select no_of_beacons from fetchBeaconCount)
from t_section_visit tsv 
left join m_beacon mb on tsv.beacon_id = mb.beacon_id 
where  mb.store_id = $1 and 
TO_CHAR(tsv.entry_date_time, 'YYYY-MM-DD') = 
TO_CHAR(current_timestamp , 'YYYY-MM-DD')
`;
//# sourceMappingURL=store-admin.query.js.map