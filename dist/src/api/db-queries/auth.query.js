"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdminQuery = void 0;
exports.loginAdminQuery = `SELECT admin_id,email,password,salt,
    m_role.role_name  
    FROM m_admin 
    FULL JOIN m_role on 
    m_role.role_id=m_admin.role_id
    WHERE email= $1;`;
//# sourceMappingURL=auth.query.js.map