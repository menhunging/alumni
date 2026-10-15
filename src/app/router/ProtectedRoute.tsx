import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCurrentUser } from "../../entities/auth/api/queries";
import { useAuthStore } from "../../entities/auth/model/authStore";

export function ProtectedRoute() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const location = useLocation();
  const currentUserQuery = useCurrentUser();

  if (!accessToken) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  // if (currentUserQuery.isPending) {
  //   return <p>Загрузка данных пользователя...</p>;
  // }

  if (currentUserQuery.isError) {
    return (
      <div>
        <p>Не удалось проверить сессию.</p>
        <button type="button" onClick={() => currentUserQuery.refetch()}>
          Повторить
        </button>
      </div>
    );
  }

  return <Outlet />;
}
