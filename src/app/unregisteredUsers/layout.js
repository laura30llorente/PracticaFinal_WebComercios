// LAYOUT DEL APARTADO USUARIOS NO REGISTRADOS

// Importamos el componente UnregisteredUsersNavbar
import UnregisteredUsersNavbar from '../../components/UnregisteredUsersNavbar.jsx';

export const metadata = {
  title: 'Unregistered Users',
  description: 'Generated by create next app',
}

export default function UnregisteredUsersLayout({ children }) {
  return (
    <>
        <div className="flex flex-col min-h-screen bg-slate-300">
          
          {/* Añadimos un componente UnregisteredUsersNavbar */}
          <UnregisteredUsersNavbar></UnregisteredUsersNavbar>

          {children}
        </div>

    </>
  );
};