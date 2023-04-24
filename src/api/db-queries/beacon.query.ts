export const fetchBeaconListQuery = `SELECT m_beacon.name,
m_beacon.beacon_id,
m_beacon.name,
m_beacon.major_id,
m_beacon.device_id,
m_beacon.minor_id,
m_beacon.store_id,
s.store_name,
m_beacon.section_id,
m_beacon.status,
count(*) over()
FROM m_beacon
LEFT JOIN m_store s
ON m_beacon.store_id = s.store_id`;

export const getStoreAndSectionOfBeacon = `
SELECT mb.store_id, mb.section_id, mst.store_name,
mse.section_name
FROM m_beacon mb
LEFT JOIN m_store mst
ON mb.store_id = mst.store_id
LEFT JOIN m_section mse
ON mb.section_id = mse.section_id
WHERE mb.major_id = $1
`

export const userVisitUpdateQuery = `
with storeDetails as (
    select mb.beacon_id
    from m_beacon mb where  mb.major_id = $2
    ),
   
    updateExitStatus as (
    update t_section_visit 
    set entry_status = false,
    exit_date_time = CURRENT_TIMESTAMP
    where cast(user_id as int)  = cast($1 as int)  and 
    entry_status= true 
    )
    insert into t_section_visit (beacon_id,user_id)
    select beacon_id , cast($1 as int)  from storeDetails
`;