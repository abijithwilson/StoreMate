import { OFFER_LIST_SORT, SORT_ORDER } from 'src/shared/constants';

export const offerListingQuery = (
  sortField: string,
  sortOrder: string,
  limit: number,
  offset: number
) => `SELECT offer_id,description,offer_title,
image,TO_CHAR(start_date, 'YYYY-MM-DD') as start_date,
TO_CHAR(end_date, 'YYYY-MM-DD') as end_date,
 count(*) over()
  FROM m_offer
WHERE ($1::text is null or 
    UPPER(offer_title) LIKE UPPER ($1)) 
    AND is_deleted=false
    ORDER BY ${sortField ? OFFER_LIST_SORT[sortField] : 'updated_at'} 
    ${sortOrder ? SORT_ORDER[sortOrder] : 'DESC'}
    ${limit ? `limit ${limit}` : ''}
    ${offset ? `offset ${offset}` : ''}
`;
