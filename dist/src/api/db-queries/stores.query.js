"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchLastVisitedStoresQuery = exports.storeDistrictFetchQuery = exports.storeStateFetchQuery = exports.storeCountryFetchQuery = exports.storeNameQuery = exports.storeSectionBarchartQuery = exports.offerWiseProductFetchQuery = exports.vistorsLineGraphQuery = exports.storeSectionPiechartQuery = exports.fetchStoresQuery = exports.unAssigninofferQuery = exports.storeOfferFetchDetailQuery = exports.userProductFetchQuery = exports.insertSkuUnderStore = exports.DeleteSkuUnderStore = exports.fetchStoreWiseProductListQuery = exports.skuUnderStoreAndProductQuery = exports.StoreRewardUpdateQuery = exports.fetchStoreWithoutRewardQuery = exports.insertStoreRewardPointsQuery = exports.rewardDetailsFetchQuery = exports.nearbyStoresQuery = exports.listSingleStoreQuery = exports.listAllStoresQuery = void 0;
const K = require("../../shared/constants");
exports.listAllStoresQuery = `SELECT m_store.store_id, m_store.store_name,
 countries.country_id,
countries.country_name,states.state_id,
 states.state_name,
districts.district_id,district_name,
longitude,latitude,address,email,image,
phone,updated_by, count(*) over()
FROM m_store
INNER JOIN countries
ON m_store.country_id = countries.country_id
INNER JOIN states
ON m_store.state_id = states.state_id
INNER JOIN districts
ON m_store.district_id = districts.district_id
WHERE m_store.is_deleted = false
`;
exports.listSingleStoreQuery = `SELECT m_store.store_id,
 m_store.store_name,
countries.country_id,countries.country_name,states.state_id,
states.state_name,districts.district_id,district_name,
longitude,latitude,m_store.address,m_store.email,m_store.image,
m_store.phone,m_store.updated_by,mr.per_visit_points ,
mr.total_points ,mr.total_remaining_points,
COALESCE(json_agg(jsonb_build_object(
                'adminId',ma.admin_id ,
                'adminName',concat(ma.first_name, ' ', ma.last_name)          
            )) FILTER (WHERE ma.admin_id  IS NOT NULL), '[]') AS 
            store_admin
FROM m_store
left JOIN countries ON m_store.country_id = countries.country_id
left JOIN states ON m_store.state_id = states.state_id
left JOIN districts ON m_store.district_id = districts.district_id
left join m_reward mr on m_store.store_id = mr.store_id
left join t_admin_store_map tasm ON m_store.store_id = tasm .store_id 
left join m_admin ma on tasm.admin_id  = ma.admin_id  
WHERE m_store.store_id=$1 AND m_store.is_deleted = false
group by m_store.store_id,countries.country_id,states.state_id,
districts.district_id,mr.per_visit_points,mr.total_points,
mr.total_remaining_points

`;
const nearbyStoresQuery = (userlatitude, userlongitude) => ` SELECT * FROM (SELECT store_id,store_name,latitude,longitude,
      (point(longitude,latitude)
      <@> point(${userlongitude},${userlatitude})) 
      * 1.609344 AS distance
      FROM m_store
      ORDER BY
      distance ASC) AS ResultData
      WHERE ResultData.distance < (50)`;
exports.nearbyStoresQuery = nearbyStoresQuery;
exports.rewardDetailsFetchQuery = `SELECT m_store.store_id,
m_store.store_name,districts.district_id,
districts.district_name,m_reward.reward_id,
m_reward.total_points,
m_reward.per_visit_points,
m_reward.total_remaining_points,m_reward.updated_by,
count(*) over()
FROM m_reward
LEFT JOIN m_store
ON m_store.store_id = m_reward.store_id
LEFT JOIN countries
ON m_store.country_id = countries.country_id
LEFT JOIN states
ON m_store.state_id = states.state_id
LEFT JOIN districts
ON m_store.district_id = districts.district_id
WHERE  m_store.is_deleted = false
ORDER BY m_reward.updated_at DESC`;
const insertStoreRewardPointsQuery = (assignedStoreIdValues) => `INSERT INTO
   m_reward (per_visit_points,
    total_points,updated_by,
    total_remaining_points,
    store_id)
   values($1,$2,$3,$2,unnest(array[ 
  ${assignedStoreIdValues} 
  ]))`;
exports.insertStoreRewardPointsQuery = insertStoreRewardPointsQuery;
exports.fetchStoreWithoutRewardQuery = `SELECT m_store.store_id,
m_store.store_name
from m_store
where m_store.is_deleted=false and 
store_id NOT IN (select store_id from m_reward)
ORDER BY m_store.updated_at DESC
`;
const StoreRewardUpdateQuery = (storeId) => {
    let queryValue = 3;
    return `UPDATE m_reward
  SET total_points =COALESCE($1,total_points),
     per_visit_points =COALESCE($2,per_visit_points),
      updated_at=CURRENT_TIMESTAMP,
      updated_by=$3,
      total_remaining_points=(
        case when $1 > total_points then 
        total_remaining_points+($1-total_points)
              when $1 < total_points then 
              (case when total_remaining_points-(total_points-$1) < 0 
              then 0 else total_remaining_points-(total_points-$1) end)
              else total_remaining_points end)
      WHERE store_id IN(${storeId.map(() => {
        queryValue = queryValue + 1;
        return `$${queryValue}`;
    })})`;
};
exports.StoreRewardUpdateQuery = StoreRewardUpdateQuery;
exports.skuUnderStoreAndProductQuery = `select 
mst.id,
ms."name" as size,
mc."name" as colour ,
mc.colour_code as colour_code,
mst.base_price,
mst.sale_price_discount_percent,
mst.image,
case when tspm.id is null then false else true end as availabilty
from m_sku_table mst
left join m_colour mc on mst.colour_id = mc.id 
left join m_size ms on mst.size_id = ms.id 
left join t_section_product_map tspm on 
mst.id= tspm.sku_id  and tspm.store_id = $2 
where mst.product_id= $1
order by mst.updated_at DESC
`;
exports.fetchStoreWiseProductListQuery = `select 
mp.id,
mp.product_name,
mp.category_id,
mc.name as category_name,
mst.image,
mst.id as sku_id,
mst.base_price as price,
mst.sale_price_discount_percent,
case when exists(select id from t_section_product_map tspm
         where tspm.store_id = $1 and tspm.product_id = mp.id) 
         then true else false end as availability,
count(*) over()
from m_product mp
left join m_sku_table mst
on mp.id = mst.product_id
left join m_category mc
on mp.category_id = mc.id
where mp.is_deleted = false
and mst.default_product = true`;
const DeleteSkuUnderStore = (deletedStoreId) => {
    let queryValue = 0;
    return `
  delete from t_section_product_map where sku_id  in (${deletedStoreId.map(() => {
        queryValue = queryValue + 1;
        return `$${queryValue}`;
    })}) returning store_id`;
};
exports.DeleteSkuUnderStore = DeleteSkuUnderStore;
const insertSkuUnderStore = (insertStoreId) => `
insert into t_section_product_map (store_id,sku_id,product_id)
  values ($1,unnest(array[${insertStoreId}]),$2) returning store_id`;
exports.insertSkuUnderStore = insertSkuUnderStore;
const userProductFetchQuery = (filterCategory, filterColour, fiterSize) => {
    const dataValue = [];
    let queryValue = 4;
    const filterQuery = [];
    if (filterCategory) {
        filterQuery.push(`AND category_id IN (${JSON.parse(filterCategory).map(() => {
            queryValue = queryValue + 1;
            return `$${queryValue}`;
        })})`);
        dataValue.push(...JSON.parse(filterCategory));
    }
    if (fiterSize) {
        filterQuery.push(`AND mst.size_id IN (${JSON.parse(fiterSize).map(() => {
            queryValue = queryValue + 1;
            return `$${queryValue}`;
        })})`);
        dataValue.push(...JSON.parse(fiterSize));
    }
    if (filterColour) {
        filterQuery.push(`AND mst.colour_id  IN (${JSON.parse(filterColour).map(() => {
            queryValue = queryValue + 1;
            return `$${queryValue}`;
        })})`);
        dataValue.push(...JSON.parse(filterColour));
    }
    return {
        query: `select mp.id as product_id,
    mp.product_name,
    mp.description,
    mp.category_id,
    mc.name as category_name,
    (select id as sku_id from m_sku_table 
    where product_id = mp.id and default_product = true),
    (select sku_unique_id from m_sku_table 
      where product_id = mp.id and default_product = true),
    (select colour_id from m_sku_table mst 
      where product_id=mp.id and default_product=true),
    (select size_id from m_sku_table 
      where product_id=mp.id and default_product=true),
    (select image from m_sku_table 
      where product_id=mp.id and default_product=true),
    (select base_price as price from m_sku_table 
      where product_id=mp.id and default_product=true),
    (select sale_price_discount_percent from m_sku_table 
      where product_id=mp.id and default_product=true),
    (select (base_price - (sale_price_discount_percent * base_price)/100)
    from m_sku_table 
    where product_id=mp.id and default_product=true) as discount_price,
    case when exists(select id from t_wishlist_user twu
    where twu.store_id = $1 and twu.section_id = $2 and twu.user_id = $3
    and twu.product_id = mp.id)
    then true else false end as wishlist_status,
    count(*) over()
    from m_product mp 
    left join m_category mc on mp.category_id = mc.id 
    left join m_sku_table mst on mp.id = mst.product_id 
    left join m_size ms on mst.size_id = ms.id 
    left join m_colour mc2 on mst.colour_id = mc2.id 
    where exists(select id from t_section_product_map tspm
    where tspm.store_id = $1 and tspm.product_id = mp.id and
    tspm.section_id =$2) and
    ($4::text is null or UPPER(product_name) LIKE UPPER ($4))
    and mp.is_deleted = false
    ${filterQuery.join(' ')}`,
        dataValue: dataValue
    };
};
exports.userProductFetchQuery = userProductFetchQuery;
const storeOfferFetchDetailQuery = (sortField, sortOrder, limit, offset) => `
select 
mo.offer_id,
mo.offer_title,
mo.description,
mo.image,
TO_CHAR(mo.start_date, 'YYYY-MM-DD') as start_date ,
TO_CHAR(mo.end_date, 'YYYY-MM-DD') as end_date ,
count(*) over(),
case when exists(select id from  t_offer_store_map tosm
         where tosm.store_id = $1 and tosm.offer_id=mo.offer_id) 
         then true else false end as status
from m_offer mo 
where mo.is_deleted =false and end_date >= current_date and
($2::text is null or 
  UPPER(offer_title) LIKE UPPER ($2))
ORDER BY ${sortField ? K.OFFER_LIST_SORT[sortField] : 'updated_at'} 
    ${sortOrder ? K.SORT_ORDER[sortOrder] : 'DESC'}
    ${limit ? `limit ${limit}` : ''}
    ${offset ? `offset ${offset}` : ''}
`;
exports.storeOfferFetchDetailQuery = storeOfferFetchDetailQuery;
exports.unAssigninofferQuery = `
delete from t_offer_store_map
where store_id=$1 and offer_id=$2 
returning id`;
exports.fetchStoresQuery = `select ms.store_id,
ms.store_name
from m_store ms
where ms.is_deleted = false 
and ($1::integer is null or ms.country_id = $1)
and ($2::integer is null or ms.state_id = $2)
and ($3::integer is null or ms.district_id = $3)
order by ms.updated_at DESC
`;
const storeSectionPiechartQuery = (span) => `
with userDetails as (
  select
         tsv.entry_date_time,
         tsv.user_id,
         tsv.section_id,
         ms.section_name 
  FROM t_section_visit tsv 
  left join m_section ms  on tsv.section_id = ms.section_id 
  where to_char(tsv.entry_date_time, '${K.SPAN_TYPE[span]}') = 
  to_char(current_timestamp, '${K.SPAN_TYPE[span]}')
  and tsv.store_id = $1 
  group by  tsv.user_id,tsv.section_id, tsv.entry_date_time,ms.section_name
  )	,
  
  groupingDetailsWithSpan as (
  select
         to_char(entry_date_time, '${K.SPAN_TYPE[span]}') 
         as visiting_data,
         section_id as section_id,
         section_name,
         COUNT(distinct user_id) AS vistor_count
  from userDetails
  GROUP BY to_char(entry_date_time, '${K.SPAN_TYPE[span]}'),
  section_id,section_name
  order by to_char(entry_date_time,'${K.SPAN_TYPE[span]}') )
  
  select 
  json_agg(jsonb_build_object(
                  'sectionId',section_id,
                  'sectionName',section_name,
                  'sectionCount',vistor_count 
              )) as section_pie_chart_dto,
              sum(vistor_count) as total_count
  from groupingDetailsWithSpan
  group by visiting_data
`;
exports.storeSectionPiechartQuery = storeSectionPiechartQuery;
const vistorsLineGraphQuery = (span, limit, offset) => `
with userDetails as (  select 
  tsv.user_id ,
  date_trunc('hour', tsv.entry_date_time  + interval '30 min') 
  as entry_date_time
  from 
  t_section_visit tsv 
  left join m_beacon mb ON tsv.beacon_id = mb.beacon_id 
  where mb.store_id =$1 and 
  to_char(tsv.entry_date_time, '${K.SPAN_TYPE[span]}') = 
  to_char(current_timestamp, '${K.SPAN_TYPE[span]}')
  group by 
  date_trunc('hour', tsv.entry_date_time  + interval '30 min')
  ,tsv.user_id 
  order by tsv.user_id )

  select 
  cast (entry_date_time::timestamp as time)as visit_time,
  count(1) as total_visitor
  from userDetails
  group by visit_time
  order by visit_time 
  ${limit ? `limit ${limit}` : ''}
  ${offset ? `offset ${offset}` : ''}
  `;
exports.vistorsLineGraphQuery = vistorsLineGraphQuery;
const offerWiseProductFetchQuery = (filterCategory, filterColour, fiterSize) => {
    const dataValue = [];
    let queryValue = 5;
    const filterQuery = [];
    if (filterCategory) {
        filterQuery.push(`AND mp.category_id IN (${JSON.parse(filterCategory).map(() => {
            queryValue = queryValue + 1;
            return `$${queryValue}`;
        })})`);
        dataValue.push(...JSON.parse(filterCategory));
    }
    if (fiterSize) {
        filterQuery.push(`AND mst.size_id IN (${JSON.parse(fiterSize).map(() => {
            queryValue = queryValue + 1;
            return `$${queryValue}`;
        })})`);
        dataValue.push(...JSON.parse(fiterSize));
    }
    if (filterColour) {
        filterQuery.push(`AND mst.colour_id  IN (${JSON.parse(filterColour).map(() => {
            queryValue = queryValue + 1;
            return `$${queryValue}`;
        })})`);
        dataValue.push(...JSON.parse(filterColour));
    }
    return {
        query: `select 
      mp.id as product_id ,mp.product_name,mc."name" as category_name, 
      (select image  from m_sku_table where 
      product_id=mp.id and default_product=true),
      (select base_price  from m_sku_table where 
      product_id=mp.id and default_product=true) as price,
      (select sale_price_discount_percent from m_sku_table 
      where product_id=mp.id and default_product=true),
      (select (base_price - (sale_price_discount_percent * base_price)/100)
      from m_sku_table 
      where product_id=mp.id and default_product=true) as discount_price,
      case when exists(select id from t_wishlist_user twu
      where twu.store_id = $1 and twu.section_id = $3 and twu.user_id = $4
      and twu.product_id = mp.id)
      then true else false end as wishlist_status,
      count(*) over()
      from m_product mp 
      left join m_category mc on mp.category_id = mc.id 
      left join t_product_offer_map tpom on mp.id = tpom.product_id 
      left join t_offer_store_map tosm on tpom.offer_id = tosm.offer_id 
      left join t_section_product_map tspm 
      on tosm.store_id = tspm.store_id and mp.id = tspm.product_id 
      left join m_sku_table mst on tspm.sku_id = mst.id 
      where tspm.store_id = $1 and tpom.offer_id =$2 and 
      tspm.section_id = $3 and
      ($5::text is null or UPPER(mp.product_name) LIKE UPPER ($5))  and
      mp.is_deleted = false
      ${filterQuery.join(' ')}`,
        dataValue: dataValue
    };
};
exports.offerWiseProductFetchQuery = offerWiseProductFetchQuery;
const storeSectionBarchartQuery = (span, limit, offset) => `
with userDetail AS (
  select 
  tsv.user_id,
  tsv.entry_date_time ,
  ROW_NUMBER() OVER  w as user_order_sequence
  from t_section_visit tsv
  left join m_beacon mb ON tsv.beacon_id = mb.beacon_id 
  where mb.store_id=$1
  GROUP BY tsv.entry_date_time , tsv.user_id
  window w as (PARTITION BY tsv.user_id ORDER BY  tsv.entry_date_time ASC)
  ),
  customer_status as (select  user_id, 
  to_char(entry_date_time, '${K.SPAN_TYPE[span]}') as time_period,
  case when user_order_sequence=1 then true else false end as status
  from userDetail
  group by user_id , to_char(entry_date_time, '${K.SPAN_TYPE[span]}') 
  , status
  ),
  customer_count as (select 
  count(distinct tsv.user_id) as net_user_count,
  to_char(tsv.entry_date_time, '${K.SPAN_TYPE[span]}') as period
  from t_section_visit tsv
  left join m_beacon mb ON tsv.beacon_id = mb.beacon_id 
  where mb.store_id=$1
  GROUP BY to_char(tsv.entry_date_time, '${K.SPAN_TYPE[span]}')
  order by to_char(tsv.entry_date_time, '${K.SPAN_TYPE[span]}') desc
  )
  select time_period,
    sum(case when status=true then 1 else 0 end) as new_customer,
    ((select net_user_count from customer_count where period = time_period) - 
    (sum(case when status=true then 1 else 0 end))) as regular_customer
    from customer_status
    group by time_period
    order by time_period desc
    ${limit ? `limit ${limit}` : 'limit 6'}
    ${offset ? `offset ${offset}` : ''}
`;
exports.storeSectionBarchartQuery = storeSectionBarchartQuery;
const storeNameQuery = (storeName) => {
    const dataValue = [storeName ? storeName : null];
    return {
        query: `SELECT concat(ms.store_name, ' - ', d.district_name) 
    as store_name, store_id 
    FROM m_store ms
    LEFT JOIN districts d
    on ms.district_id = d.district_id
    WHERE is_deleted = false AND  
    ($1::text is null or UPPER(store_name) 
    LIKE UPPER('%${storeName}%'))`,
        dataValue: dataValue
    };
};
exports.storeNameQuery = storeNameQuery;
exports.storeCountryFetchQuery = `
select 
ms.country_id,
c.country_name 
from m_store ms
left join countries c
on ms.country_id = c.country_id
where ms.is_deleted = false
group by ms.country_id, c.country_name
order by c.country_name `;
exports.storeStateFetchQuery = `
select 
ms.state_id,
s.state_name
from m_store ms
left join states s 
on ms.state_id = s.state_id 
where s.country_id = $1
and ms.is_deleted = false
group by ms.state_id,s.state_name  
order by s.state_name`;
exports.storeDistrictFetchQuery = `
select 
ms.district_id,
d.district_name
from m_store ms
left join districts d 
on ms.district_id = d.district_id 
where d.state_id = $1
and ms.is_deleted = false
group by ms.district_id, d.district_name 
order by d.district_name `;
const fetchLastVisitedStoresQuery = (limit, offset) => `with fetchStoreCount as (select 
    tsv.store_id,
    ms.store_name,
    to_char(tsv.entry_date_time, 'dd-mm-yyyy') as visit_date,
    ms.latitude,
    ms.longitude 
    from t_section_visit tsv
    left join m_store ms 
    on tsv.store_id = ms.store_id 
    where tsv.user_id = $1
    group by tsv.store_id, ms.store_name, 
    to_char(tsv.entry_date_time, 'dd-mm-yyyy'),
    ms.latitude, ms.longitude)
    select 
    store_id,
    store_name,
    count(store_id) as visited,
    latitude,
    longitude,
    max(visit_date) as last_visited
    from fetchStoreCount
    where ($2::text is null or UPPER(store_name) LIKE UPPER ($2))
    group by store_id, store_name, latitude, longitude
    order by last_visited DESC
${limit ? `limit ${limit}` : ''}
${offset ? `offset ${offset}` : ''}
`;
exports.fetchLastVisitedStoresQuery = fetchLastVisitedStoresQuery;
//# sourceMappingURL=stores.query.js.map