"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offerListingQuery = void 0;
const constants_1 = require("../../shared/constants");
const offerListingQuery = (sortField, sortOrder, limit, offset) => `SELECT offer_id,description,offer_title,
image,TO_CHAR(start_date, 'YYYY-MM-DD') as start_date,
TO_CHAR(end_date, 'YYYY-MM-DD') as end_date,
 count(*) over()
  FROM m_offer
WHERE ($1::text is null or 
    UPPER(offer_title) LIKE UPPER ($1)) 
    AND is_deleted=false
    ORDER BY ${sortField ? constants_1.OFFER_LIST_SORT[sortField] : 'updated_at'} 
    ${sortOrder ? constants_1.SORT_ORDER[sortOrder] : 'DESC'}
    ${limit ? `limit ${limit}` : ''}
    ${offset ? `offset ${offset}` : ''}
`;
exports.offerListingQuery = offerListingQuery;
//# sourceMappingURL=offer.query.js.map