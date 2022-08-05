import { useSelector } from 'react-redux';

function PermissionChecker (permissionKey) {
  
  if (permissionKey === undefined)
      return false;
      
  return JSON.parse(localStorage.usuario).roles.some(x=> x=== permissionKey);

};

export default PermissionChecker;