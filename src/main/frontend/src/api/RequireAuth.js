import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // 수정: 올바른 import 방식

function RequireAuth({ children, allowedRoles, redirectToIfUnauthorized = '/' }) {
    const location = useLocation();
    const token = localStorage.getItem('accessToken');  // 로컬 스토리지에서 토큰을 가져옵니다.
    const decodedToken = token ? jwtDecode(token) : null;  // 토큰 디코드 수정
    const userRoles = decodedToken ? [decodedToken.role] : [];  // 토큰에서 권한 정보를 추출합니다.

    const isAuthenticated = token && userRoles.some(role => allowedRoles.includes(role));

    if (!isAuthenticated) {
        return <Navigate to={redirectToIfUnauthorized} replace />;
    }

    return children;  // 토큰과 권한이 모두 유효한 경우 자식 컴포넌트를 렌더링합니다.
}

export default RequireAuth;