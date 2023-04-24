import * as K from '../../shared/constants';
export const listStoreWiseSectionsQuery = `with fetchCategories as(
  select
  tssm.section_id,
  COALESCE(json_agg(distinct jsonb_build_object(
                  'categoryId',mc.id,
                  'categoryName',mc."name",
                  'image',mc.image
              )), '[]')AS categories
  from t_section_product_map tspm 
  left join m_product mp 
  on tspm.product_id = mp.id 
  left join m_category mc 
  on mp.category_id = mc.id 
  left join t_store_section_map tssm 
  on tspm.section_id = tssm.section_id 
  and tspm.store_id = tssm.store_id 
  where tspm.store_id = $1
  group by tssm.section_id 
  )
  SELECT
  ms.section_name,
  tssm.section_id,
  count(distinct beacon_id) AS no_of_beacons,
  (select categories from fetchCategories fc 
    where tssm.section_id = fc.section_id),
  count(*) over()
  FROM t_store_section_map tssm 
  LEFT JOIN m_section ms 
  ON tssm.section_id = ms.section_id 
  LEFT JOIN m_beacon b
  ON tssm.section_id = b.section_id
  and tssm.store_id = b.store_id 
  left join fetchCategories fc on 
  tssm.section_id = fc.section_id 
  WHERE tssm.store_id = $1
  AND ms.is_deleted = false
  group by tssm.section_id, ms.section_name, ms.updated_at
  ORDER BY ms.updated_at DESC`;

export const assignSectionQuery = (section_id) =>
  `
insert into t_store_section_map (store_id,section_id)
values ($1,unnest(array[${section_id}])) returning store_id
`;

export const sectionWiseProductUnassignQuery = `
update t_section_product_map 
set section_id = NULL
where store_id = $1
and section_id = $2
and product_id = $3 returning id
`;

export const assignProductSection = (productId) => {
  let queryValue = 3;
  return `UPDATE t_section_product_map
 SET section_id = $1
 WHERE
  product_id in (${productId.map(() => {
    return `$${queryValue++}`;
  })}) and store_id=$2 returning id`;
};

export const fetchDetailsOfAProductInASection = `SELECT 
mp.id AS product_id,
mp.product_name AS name,
c.name AS category,
mp.category_id,
mp.description,
case when exists(select id from t_wishlist_user twu
  where twu.section_id = $1 and twu.product_id = mp.id 
  and twu.store_id = $3 and twu.user_id = $4) 
  then true else false end as wishlist_status,
COALESCE(json_agg(jsonb_build_object(
'image',ms.image,
'colour_id',ms.colour_id,
'colour',clr.name,
'colour_code',clr.colour_code,
'default',ms.default_product,
'size',s.name,
'size_id',ms.size_id,
'barcode',ms.barcode,
'price',ms.base_price,
'discount_percent',ms.sale_price_discount_percent)
ORDER BY ms.updated_at), '[]')AS skus
FROM t_section_product_map tspm
left join m_product mp
on tspm.product_id = mp.id
LEFT JOIN m_category c
ON mp.category_id = c.id
LEFT JOIN m_sku_table ms
ON tspm.sku_id = ms.id
LEFT JOIN m_colour clr
ON ms.colour_id = clr.id
LEFT JOIN m_size s
ON ms.size_id = s.id
where tspm.section_id=$1
AND mp.id = $2  AND tspm.store_id = $3`;

export const sectionUnderStoreDropdownQuery = `
select 
tssm.section_id ,
ms.section_name 
from t_store_section_map tssm 
left join m_section ms ON 
tssm .section_id = ms.section_id
where ms.is_deleted =false and 
tssm.store_id =$1 and 
($2::text is null or UPPER(ms.section_name) LIKE UPPER ($2))
`;

export const getSectionAndSectionNotListedInStoreQuery = (
  limit,
  offset,
  sortField,
  sortOrder
) => `
select 
section_id,
section_name ,
count(*) over()
from 
m_section 
where is_deleted = false and
($1::integer is null or section_id not in
     (select section_id from t_store_section_map where store_id =$1))
ORDER BY ${sortField ? K.SECTION_SORT[sortField] : 'updated_at'} 
    ${sortOrder ? K.SORT_ORDER[sortOrder] : 'DESC'}
${limit ? `limit ${limit}` : ''}
${offset ? `offset ${offset}` : ''}
`;

export const ProductsNotAssignedToAnySection = `
SELECT mp.id, mp.product_name, mp.category_id, 
mc.name AS category_name, msk.image, msk.base_price,
msk.sale_price_discount_percent
FROM t_section_product_map tspm
LEFT JOIN m_product mp
ON tspm.product_id = mp.id
LEFT JOIN m_category mc
ON mp.category_id = mc.id
LEFT JOIN m_sku_table msk
ON mp.id = msk.product_id
WHERE msk.default_product = true
and mp.is_deleted = false and 
tspm.store_id = $1 and tspm.section_id is null
group by mp.id,mc.name,msk.image, msk.base_price,
msk.sale_price_discount_percent
order by mp.updated_at DESC `;

export const unAssignSection = `
with unassignSectionFromProduct as(
    Update t_section_product_map   
      set section_id = null where 
      store_id =$1 and section_id =$2
   ),
   unassignSectionFromBeacon as(
    Update m_beacon   
      set section_id = null where 
      store_id =$1 and section_id =$2
   )
   Delete from t_store_section_map tssm  
   where tssm.store_id =$1 and tssm.section_id =$2
   returning tssm.id
`;

export const fetchSectionWiseCategoryListQuery = (limit, offset) => `
select 
mc.id as category_id,
mc.name as category_name,
mc.image,
count(*) over()
from t_section_product_map tspm 
left join m_product mp 
on tspm.product_id = mp.id 
left join m_category mc 
on mp.category_id = mc.id 
where tspm.section_id = $1 
and tspm.store_id = $2
group by mc.id
order by mc.name
${limit ? `limit ${limit}` : ''}
${offset ? `offset ${offset}` : ''}
`;

export const fetchSectionWiseOfferListQuery = (limit, offset) =>
  `select
  mo.offer_id ,
  mo.image,
  mo.offer_title,
  mo.description,
  count(*) over() 
  from m_offer mo 
  left join t_offer_store_map tosm on mo.offer_id = tosm.offer_id 
  left join t_product_offer_map tpom on tosm.offer_id =tpom .offer_id  
  left join t_section_product_map tspm on 
  tpom.product_id =tspm.product_id and tosm.store_id = tspm.store_id 
  left join m_product mp on tspm.product_id  = mp.id 
  where tspm.store_id =$1 and tspm.section_id=$2 and
  mo.end_date >= current_date and mo.is_deleted = false
  and mp.is_deleted = false 
  group by mo.offer_id ,mo.image 
  order by mo.updated_at  desc
${limit ? `limit ${limit}` : ''}
${offset ? `offset ${offset}` : ''}
`;

/* eslint-disable */
export const fetchWishlistProductsQuery = (
  filterCategory: string,
  filterColour: string,
  fiterSize: string
) => {
  const dataValue = [];
  let queryValue = 4;
  const filterQuery = [];
  if (filterCategory) {
    filterQuery.push(
      `AND mp.category_id IN (${JSON.parse(filterCategory).map(() => {
        queryValue = queryValue + 1;
        return `$${queryValue}`;
      })})`
    );
    dataValue.push(...JSON.parse(filterCategory));
  }
  if (fiterSize) {
    filterQuery.push(
      `AND mst.size_id IN (${JSON.parse(fiterSize).map(() => {
        queryValue = queryValue + 1;
        return `$${queryValue}`;
      })})`
    );
    dataValue.push(...JSON.parse(fiterSize));
  }
  if (filterColour) {
    filterQuery.push(
      `AND mst.colour_id  IN (${JSON.parse(filterColour).map(() => {
        queryValue = queryValue + 1;
        return `$${queryValue}`;
      })})`
    );
    dataValue.push(...JSON.parse(filterColour));
  }
  return {
    query: `with default_query as (
      select 
      twu.product_id,
      mst.image,
      mst.sale_price_discount_percent,
      mst.base_price,
      (mst.base_price -
      (mst.sale_price_discount_percent * mst.base_price)/100) as discount_price
      from t_wishlist_user twu 
      left join m_product mp 
      on twu.product_id = mp.id 
      left join m_sku_table mst 
      on mp.id = mst.product_id 
      where mst.default_product = true
      and twu.store_id = $1 and twu.section_id = $2 
      and twu.user_id = $3
    )
    select mp.id as product_id,
        mp.product_name,
        mp.description,
        mp.category_id,
        mc.name,
        dq.image,
        dq.base_price as price,
        dq.sale_price_discount_percent,
        dq.discount_price,
        count(*) over()
        from t_wishlist_user twu 
        left join m_product mp 
        on twu.product_id = mp.id
        left join m_category mc on mp.category_id = mc.id 
        left join m_sku_table mst on mp.id = mst.product_id 
        left join default_query dq
        on mp.id = dq.product_id
        where twu.store_id = $1 and twu.section_id = $2 and 
        twu.user_id = $3 and mp.is_deleted = false
        and ($4::text is null or UPPER(product_name) LIKE UPPER ($4))
        ${filterQuery.join(' ')}`,
    dataValue: dataValue
  };
};
/* eslint-enable */

export const unAssignProductFromWishlistQuery = `delete from t_wishlist_user twu
where twu.user_id = $1 and twu.store_id = $2
and twu.product_id = $3
returning twu.id `;

/*eslint-disable */
export const fetchProductFiltersQuery = (
  filterCategory,
  wishlist
) => {
  let i = 3;
  const dataValue = [];
  if (filterCategory) {
    dataValue.push(...JSON.parse(filterCategory));
  }
  return {
    query: `select 
coalesce(json_agg(distinct jsonb_build_object(
'sizeId',ms.size_id,
'size',s.name)
), '[]') as size,
coalesce(json_agg(distinct jsonb_build_object(
'colourId',ms.colour_id,
'colour',clr.name,
'colour_code',clr.colour_code)
), '[]') as colour,
coalesce(json_agg(distinct jsonb_build_object(
'categoryId',mp.category_id,
'category',c.name)
), '[]') as category,
min((ms.base_price - (ms.sale_price_discount_percent * ms.base_price)/100))
 as min_price,
 max((ms.base_price - (ms.sale_price_discount_percent * ms.base_price)/100))
 as max_price
from t_section_product_map tspm 
left join m_product mp 
on tspm.product_id = mp.id 
left join m_category c 
on mp.category_id = c.id 
left join m_sku_table ms 
on mp.id = ms.product_id 
left join m_size s
on ms.size_id = s.id 
left join m_colour clr
on ms.colour_id = clr.id
left join t_product_offer_map tpom 
on tspm.product_id = tpom.product_id 
left join t_offer_store_map tosm 
on tpom.offer_id = tosm.offer_id
and tspm.store_id = tosm.store_id 
and tspm.product_id = mp.id 
where tspm.store_id = $1 
and tspm.section_id = $2
and ($3::integer is null or tpom.offer_id = $3)
${
  wishlist === 'true' ? `and exists(select id from t_wishlist_user twu
                                where twu.store_id = $1 and twu.section_id = $2
                                and twu.user_id = $${++i} and twu.product_id = mp.id)` : ''
}
${filterCategory ?
    `and mp.category_id in (
${dataValue.map(() => {
    return `$${++i}`;
  })})` :
    ''
}`,
    dataValue: dataValue
  };
}
/*eslint-enable */

export const fetchProductDefaults = `select array(
  select distinct twu.product_id
  from t_wishlist_user twu 
  where twu.store_id = $1 
  and twu.section_id = $2
  and twu.user_id = $3
  ) as product_id`;

export const fetchSectionVisitsQuery = (
  limit,
  offset
) => `with fetchSectionCount as (select 
  tsv.section_id,
  ms2.section_name,
  to_char(tsv.entry_date_time, 'dd-mm-yyyy') as visit_date
  from t_section_visit tsv
  left join t_store_section_map tssm 
  on tsv.section_id = tssm.section_id 
  left join m_section ms2
  on tssm.section_id = ms2.section_id 
  where tsv.user_id = $1
  and tssm.store_id = $2
  and tsv.store_id = tssm.store_id 
  and ms2.is_deleted = false
  group by tsv.section_id, ms2.section_name, 
  to_char(tsv.entry_date_time, 'dd-mm-yyyy'))
  select 
  section_id,
  section_name,
  count(section_id) as visited
  from fetchSectionCount
  where ($3::text is null or UPPER(section_name) LIKE UPPER ($3))
  group by section_id, section_name
  order by visited DESC
  ${limit ? `limit ${limit}` : ''}
  ${offset ? `offset ${offset}` : ''}`;
