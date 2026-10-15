import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCurrentUser } from "../../entities/auth/api/queries";

export function ProfileCompletionRoute() {
  const location = useLocation();
  const currentUserQuery = useCurrentUser();

  if (currentUserQuery.isPending) {
    return null;
  }

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

  if (
    !currentUserQuery.data.profileCompleted &&
    location.pathname !== "/profile-setup"
  ) {
    return <Navigate to="/profile-setup" replace />;
  }

  if (
    currentUserQuery.data.profileCompleted &&
    location.pathname === "/profile-setup"
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
