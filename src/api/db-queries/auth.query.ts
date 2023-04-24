export const loginAdminQuery = `SELECT admin_id,email,password,salt,
    m_role.role_name  
    FROM m_admin 
    FULL JOIN m_role on 
    m_role.role_id=m_admin.role_id
    WHERE email= $1;`;
