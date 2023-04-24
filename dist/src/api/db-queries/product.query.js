"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skuUpdateQuery = exports.skuFetchQuery = exports.fetchProductWiseOffersQuery = exports.bulkProductUploadQuery = exports.fetchStoreWiseProductSkusQuery = exports.fetchProductOffersQuery = exports.listAllProductsQuery = exports.fetchSingleProductSkuDetailsQuery = exports.updateProductSku = exports.createProductSku = exports.deleteProductQuery = void 0;
const K = require("../../shared/constants");
exports.deleteProductQuery = `
WITH deleteSKU AS (
    delete from m_sku_table
    where product_id = $1
)
UPDATE m_product SET is_deleted=true WHERE
    id = $1 returning id
`;
const createProductSku = (values) => `
WITH insertSkuValue(
    sku_unique_id,
    colour_id,
    size_id,
    base_price,
    sale_price_discount_percent,
    image,
    default_product,
    barcode,
    updated_by) AS (
    values ${values}            
) 
INSERT INTO
 m_sku_table(
    sku_unique_id,colour_id,size_id,base_price,sale_price_discount_percent,
    image,default_product,
    barcode,updated_by,product_id)
    SELECT 
    v.sku_unique_id,v.colour_id,v.size_id,v.base_price,
    v.sale_price_discount_percent,
    v.image,
    v.default_product,
    v.barcode,
    v.updated_by,
    $1
    FROM insertSkuValue AS v;
`;
exports.createProductSku = createProductSku;
const updateProductSku = (values) => `
WITH insertSkuValue(
    id,sku_unique_id,
    colour_id,size_id,base_price,
    sale_price_discount_percent,
    image,default_product,barcode,
    updated_by,product_id,category_id) 
    AS 
    (values ${values}) 
INSERT into m_sku_table(
    id,sku_unique_id,colour_id,size_id,
    base_price,sale_price_discount_percent,
    image,default_product,barcode,
    updated_by,product_id)
    SELECT 
    v.id,
    COALESCE(v.sku_unique_id,CONCAT(v.product_id,'-',
    v.category_id,'-',v.colour_id,'-',v.size_id)),
    v.colour_id,
    v.size_id,
    v.base_price,
    v.sale_price_discount_percent,
    v.image,
    v.default_product,
    v.barcode,
    v.updated_by,
    v.product_id
    FROM insertSkuValue AS v
    ON CONFLICT (id) 
    DO 
    UPDATE SET base_price  = EXCLUDED.base_price,
    sale_price_discount_percent = EXCLUDED.sale_price_discount_percent,
    image  = EXCLUDED.image,
    default_product  = EXCLUDED.default_product;
`;
exports.updateProductSku = updateProductSku;
exports.fetchSingleProductSkuDetailsQuery = `SELECT 
m_product.id AS product_id,
m_product.product_name AS name,
c.name AS category,
m_product.category_id,
m_product.description,
COALESCE(json_agg(jsonb_build_object(
'image',ms.image,
'colour_id',ms.colour_id,
'colour',clr.name,
'colour_code',clr.colour_code,
'default',ms.default_product,
'size',s.name,
'size_id',ms.size_id,
'sku_id',ms.id,
'sku_unique_id',ms.sku_unique_id,
'barcode',ms.barcode,
'price',ms.base_price,
'discount_percent',ms.sale_price_discount_percent,
'availability',case when exists(select id from m_sku_table ms
         where ms.product_id = $1) 
         then true else false end)
ORDER BY ms.updated_at), '[]')AS skus
FROM m_product
LEFT JOIN m_category c
ON m_product.category_id = c.id
LEFT JOIN m_sku_table ms
ON m_product.id = ms.product_id
LEFT JOIN m_colour clr
ON ms.colour_id = clr.id
LEFT JOIN m_size s
ON ms.size_id = s.id
WHERE m_product.is_deleted = false
AND m_product.id = $1`;
exports.listAllProductsQuery = `select m_product.id,
m_product.product_name,
m_category.id AS category_id,
m_category.name AS category_name,
m_sku_table.base_price AS price,
m_sku_table.sale_price_discount_percent,
m_sku_table.image,
m_sku_table.sku_unique_id,
m_product.updated_by,
count(*) over()
FROM m_product
LEFT JOIN m_sku_table ON m_product.id = m_sku_table.product_id
LEFT JOIN m_category ON m_product.category_id = m_category.id
WHERE m_product.is_deleted = false 
AND m_sku_table.default_product = true
AND ($1::text is null or product_name LIKE $1 )    
AND ($2::text is null or CAST(m_product.id AS TEXT) LIKE $2)      
AND ($3::text is null or m_category.name LIKE $3)`;
const fetchProductOffersQuery = (sortField, sortOrder, limit, offset) => `
select 
mo.offer_id,
mo.offer_title,
mo.discount_percent,
mo.description,
mo.image,
mo.start_date,
mo.end_date,
count(*) over()
from m_offer mo 
left join t_product_offer_map tpom 
on mo.offer_id = tpom.offer_id 
left join t_offer_store_map tosm 
on mo.offer_id = tosm.offer_id 
and tpom.offer_id = tosm.offer_id 
where tpom.product_id = $1
and tosm.store_id = $2
and mo.end_date >= current_date
and mo.is_deleted = false
ORDER BY ${sortField ? K.OFFER_LIST_SORT[sortField] : 'updated_at'} 
${sortOrder ? K.SORT_ORDER[sortOrder] : 'DESC'}
${limit ? `limit ${limit}` : ''}
${offset ? `offset ${offset}` : ''}
`;
exports.fetchProductOffersQuery = fetchProductOffersQuery;
exports.fetchStoreWiseProductSkusQuery = `
select 
m_product.id AS product_id,
m_product.product_name AS name,
c.name AS category,
m_product.category_id,
m_product.description,
COALESCE(json_agg(jsonb_build_object(
'image',ms.image,
'colour_id',ms.colour_id,
'colour',clr.name,
'colour_code',clr.colour_code,
'default',ms.default_product,
'size',s.name,
'size_id',ms.size_id,
'sku_id',ms.id,
'sku_unique_id',ms.sku_unique_id,
'barcode',ms.barcode,
'price',ms.base_price,
'discount_percent',ms.sale_price_discount_percent,
'availability',case when exists(select id from t_section_product_map tspm
         where tspm.store_id = $1 and tspm.sku_id = ms.id
         and m_product.id = $2) 
         then true else false end)
order by ms.updated_at), '[]')AS skus
from m_product
left join m_category c
on m_product.category_id = c.id
left join m_sku_table ms
on m_product.id = ms.product_id
left join m_colour clr
on ms.colour_id = clr.id
left join m_size s
on ms.size_id = s.id
where m_product.id = $2
and m_product.is_deleted = false
and ($3::integer is null or ms.colour_id = $3)
and ($4::integer is null or ms.size_id = $4)
group by m_product.id,c.name`;
const bulkProductUploadQuery = (file, id) => {
    const singleProductQueryArray = [];
    const { products } = file;
    let i = 0;
    products.forEach((product) => {
        const { product_name, description, category_id, sale_price_discount, base_price, colour_id, size_id, in_store_availability, image, default_product } = product;
        const query = `
    with product${++i} as
     (insert into m_product (product_name,
      description,category_id,updated_by) values
     ('${product_name}','${description}',${category_id},${id})
     on conflict(product_name) do update
     SET product_name  = EXCLUDED.product_name
     returning id)
     insert into m_sku_table (
        sku_unique_id,sale_price_discount_percent,base_price,
        colour_id,size_id,in_store_availability,
        image,default_product,product_id,barcode,updated_by) 
        values
        (
        concat(
          (select id from product${i})
          ,'-',${category_id},'-',${colour_id},'-',${size_id}),
        ${sale_price_discount},
        ${base_price},
        ${colour_id},
        ${size_id},
        ${in_store_availability},
        '${image}',
        ${default_product},
        (select id from product${i}),
        cast(
            concat
            ('9',(select nextval('barcode_sequence_id')),'5') as bigint),
        ${id}    
        );`;
        singleProductQueryArray.push(query);
    });
    return singleProductQueryArray;
};
exports.bulkProductUploadQuery = bulkProductUploadQuery;
const fetchProductWiseOffersQuery = (sortField, sortOrder, limit, offset) => `
select 
tpom.offer_id,
mo.offer_title,
mo.discount_percent,
mo.description,
mo.image,
mo.start_date,
mo.end_date,
count(*) over()
from t_product_offer_map tpom 
left join m_offer mo 
on tpom.offer_id = mo.offer_id 
where tpom.product_id = $1 and mo.end_date >= current_date
and mo.is_deleted = false
ORDER BY ${sortField ? K.OFFER_LIST_SORT[sortField] : 'updated_at'} 
${sortOrder ? K.SORT_ORDER[sortOrder] : 'DESC'}
${limit ? `limit ${limit}` : ''}
${offset ? `offset ${offset}` : ''}
`;
exports.fetchProductWiseOffersQuery = fetchProductWiseOffersQuery;
const skuFetchQuery = (productListSet) => {
    return `select
mst.id from m_sku_table mst 
left join m_product mp 
on mst.product_id = mp.id 
where mp.product_name in (${productListSet.map(d => `'${d}'`).join(',')})
and mst.default_product = true`;
};
exports.skuFetchQuery = skuFetchQuery;
const skuUpdateQuery = (idList) => `update m_sku_table 
set default_product = false 
where id in (${idList.join(',')})`;
exports.skuUpdateQuery = skuUpdateQuery;
//# sourceMappingURL=product.query.js.map