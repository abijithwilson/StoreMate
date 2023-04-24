export declare const listAllStoresQuery = "SELECT m_store.store_id, m_store.store_name,\n countries.country_id,\ncountries.country_name,states.state_id,\n states.state_name,\ndistricts.district_id,district_name,\nlongitude,latitude,address,email,image,\nphone,updated_by, count(*) over()\nFROM m_store\nINNER JOIN countries\nON m_store.country_id = countries.country_id\nINNER JOIN states\nON m_store.state_id = states.state_id\nINNER JOIN districts\nON m_store.district_id = districts.district_id\nWHERE m_store.is_deleted = false\n";
export declare const listSingleStoreQuery = "SELECT m_store.store_id,\n m_store.store_name,\ncountries.country_id,countries.country_name,states.state_id,\nstates.state_name,districts.district_id,district_name,\nlongitude,latitude,m_store.address,m_store.email,m_store.image,\nm_store.phone,m_store.updated_by,mr.per_visit_points ,\nmr.total_points ,mr.total_remaining_points,\nCOALESCE(json_agg(jsonb_build_object(\n                'adminId',ma.admin_id ,\n                'adminName',concat(ma.first_name, ' ', ma.last_name)          \n            )) FILTER (WHERE ma.admin_id  IS NOT NULL), '[]') AS \n            store_admin\nFROM m_store\nleft JOIN countries ON m_store.country_id = countries.country_id\nleft JOIN states ON m_store.state_id = states.state_id\nleft JOIN districts ON m_store.district_id = districts.district_id\nleft join m_reward mr on m_store.store_id = mr.store_id\nleft join t_admin_store_map tasm ON m_store.store_id = tasm .store_id \nleft join m_admin ma on tasm.admin_id  = ma.admin_id  \nWHERE m_store.store_id=$1 AND m_store.is_deleted = false\ngroup by m_store.store_id,countries.country_id,states.state_id,\ndistricts.district_id,mr.per_visit_points,mr.total_points,\nmr.total_remaining_points\n\n";
export declare const nearbyStoresQuery: (userlatitude: number, userlongitude: number) => string;
export declare const rewardDetailsFetchQuery = "SELECT m_store.store_id,\nm_store.store_name,districts.district_id,\ndistricts.district_name,m_reward.reward_id,\nm_reward.total_points,\nm_reward.per_visit_points,\nm_reward.total_remaining_points,m_reward.updated_by,\ncount(*) over()\nFROM m_reward\nLEFT JOIN m_store\nON m_store.store_id = m_reward.store_id\nLEFT JOIN countries\nON m_store.country_id = countries.country_id\nLEFT JOIN states\nON m_store.state_id = states.state_id\nLEFT JOIN districts\nON m_store.district_id = districts.district_id\nWHERE  m_store.is_deleted = false\nORDER BY m_reward.updated_at DESC";
export declare const insertStoreRewardPointsQuery: (assignedStoreIdValues: string) => string;
export declare const fetchStoreWithoutRewardQuery = "SELECT m_store.store_id,\nm_store.store_name\nfrom m_store\nwhere m_store.is_deleted=false and \nstore_id NOT IN (select store_id from m_reward)\nORDER BY m_store.updated_at DESC\n";
export declare const StoreRewardUpdateQuery: (storeId: number[]) => string;
export declare const skuUnderStoreAndProductQuery = "select \nmst.id,\nms.\"name\" as size,\nmc.\"name\" as colour ,\nmc.colour_code as colour_code,\nmst.base_price,\nmst.sale_price_discount_percent,\nmst.image,\ncase when tspm.id is null then false else true end as availabilty\nfrom m_sku_table mst\nleft join m_colour mc on mst.colour_id = mc.id \nleft join m_size ms on mst.size_id = ms.id \nleft join t_section_product_map tspm on \nmst.id= tspm.sku_id  and tspm.store_id = $2 \nwhere mst.product_id= $1\norder by mst.updated_at DESC\n";
export declare const fetchStoreWiseProductListQuery = "select \nmp.id,\nmp.product_name,\nmp.category_id,\nmc.name as category_name,\nmst.image,\nmst.id as sku_id,\nmst.base_price as price,\nmst.sale_price_discount_percent,\ncase when exists(select id from t_section_product_map tspm\n         where tspm.store_id = $1 and tspm.product_id = mp.id) \n         then true else false end as availability,\ncount(*) over()\nfrom m_product mp\nleft join m_sku_table mst\non mp.id = mst.product_id\nleft join m_category mc\non mp.category_id = mc.id\nwhere mp.is_deleted = false\nand mst.default_product = true";
export declare const DeleteSkuUnderStore: (deletedStoreId: any) => string;
export declare const insertSkuUnderStore: (insertStoreId: any) => string;
export declare const userProductFetchQuery: (filterCategory: string, filterColour: string, fiterSize: string) => {
    query: string;
    dataValue: any[];
};
export declare const storeOfferFetchDetailQuery: (sortField: string, sortOrder: string, limit: number, offset: number) => string;
export declare const unAssigninofferQuery = "\ndelete from t_offer_store_map\nwhere store_id=$1 and offer_id=$2 \nreturning id";
export declare const fetchStoresQuery = "select ms.store_id,\nms.store_name\nfrom m_store ms\nwhere ms.is_deleted = false \nand ($1::integer is null or ms.country_id = $1)\nand ($2::integer is null or ms.state_id = $2)\nand ($3::integer is null or ms.district_id = $3)\norder by ms.updated_at DESC\n";
export declare const storeSectionPiechartQuery: (span: any) => string;
export declare const vistorsLineGraphQuery: (span: any, limit: any, offset: any) => string;
export declare const offerWiseProductFetchQuery: (filterCategory: string, filterColour: string, fiterSize: string) => {
    query: string;
    dataValue: any[];
};
export declare const storeSectionBarchartQuery: (span: any, limit: any, offset: any) => string;
export declare const storeNameQuery: (storeName: string) => {
    query: string;
    dataValue: string[];
};
export declare const storeCountryFetchQuery = "\nselect \nms.country_id,\nc.country_name \nfrom m_store ms\nleft join countries c\non ms.country_id = c.country_id\nwhere ms.is_deleted = false\ngroup by ms.country_id, c.country_name\norder by c.country_name ";
export declare const storeStateFetchQuery = "\nselect \nms.state_id,\ns.state_name\nfrom m_store ms\nleft join states s \non ms.state_id = s.state_id \nwhere s.country_id = $1\nand ms.is_deleted = false\ngroup by ms.state_id,s.state_name  \norder by s.state_name";
export declare const storeDistrictFetchQuery = "\nselect \nms.district_id,\nd.district_name\nfrom m_store ms\nleft join districts d \non ms.district_id = d.district_id \nwhere d.state_id = $1\nand ms.is_deleted = false\ngroup by ms.district_id, d.district_name \norder by d.district_name ";
export declare const fetchLastVisitedStoresQuery: (limit: any, offset: any) => string;
