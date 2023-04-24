export const fetchAddressDetailQuery = `
select 
ma.id ,
ma.address ,
ma.country_id ,
ma .state_id ,
c.country_name,
d.district_name ,
s.state_name ,
ma.district_id ,
ma.user_id ,
ma.locality ,
ma.pincode
from m_address ma
left join countries c ON ma .country_id = c.country_id 
left join states s on ma.state_id = s.state_id 
left join districts d ON ma.district_id = d.district_id 
where ma.user_id = $1
`;
export const updateUserRewardQuery = `with selectStoreId as 
 (select store_id, section_id, beacon_id from m_beacon where major_id = $1 ) ,

 updateExitStatus as (
    update t_section_visit 
    set entry_status = false,
    exit_date_time = CURRENT_TIMESTAMP
    where cast(user_id as int)  = cast($2 as int)  and 
    entry_status= true ),

    addUserEntry as (
        insert into t_section_visit (beacon_id,user_id, section_id, store_id)
    select beacon_id , cast($2 as int), section_id, store_id  
    from selectStoreId),

  selectReward as (
  select per_visit_points,
  store_id,total_remaining_points from m_reward where store_id = 
  (select store_id from selectStoreId) ),
  
  findUser as (
  select user_id from t_reward_user_track trut
  where user_id=$2 and 
  created_at = current_date 
  and store_id=(select store_id from selectReward)),
  
  insertUserRewardDetails as 
  (insert into t_reward_user_track(user_id,store_id,reward_points,created_at)
  select $2,store_id,per_visit_points,current_date
  from selectReward
  where not exists
  (select user_id  from findUser)
  and total_remaining_points - per_visit_points >= 0
  returning id) ,
  
  updateUserReward as (
  update m_users
  set reward_points_earned =coalesce (reward_points_earned,0) + 
  (select per_visit_points from selectReward)
  where EXISTS(select id from  insertUserRewardDetails) and id=$2
  returning id
  )    
  
  update m_reward 
  set total_remaining_points = total_remaining_points - per_visit_points 
  where total_remaining_points - per_visit_points >=0
  and EXISTS(select id from  insertUserRewardDetails)
  returning (select id from updateUserReward)`;

export const userExitQuery = `
  with fetchBeaconDetails as(
    select beacon_id from m_beacon mb 
    where mb.device_id = $1
    )
    update t_section_visit 
    set entry_status = false,
    exit_date_time = current_timestamp 
    where entry_status = true and user_id = $2
    returning user_id
  `;
