import { useSelector } from 'react-redux';

function PermissionChecker (permissionKey) {
  const { permissions } = useSelector((state) => state.auth);
  
  if (permissionKey === undefined)
      return false;
      
  return permissions?.some(x => x === permissionKey);

};

export default PermissionChecker;