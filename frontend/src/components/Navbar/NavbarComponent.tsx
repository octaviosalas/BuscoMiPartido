import React from 'react'
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate()

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];


  return (
    <div className='bg-blue-500 flex items-center justify-between w-screen h-12'>
      <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
          <NavbarContent className="sm:hidden" justify="start">
            <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
          </NavbarContent>

          <NavbarContent className="sm:hidden pr-3" justify="center">
            <NavbarBrand>
              <p className="font-bold text-inherit" onClick={() => navigate("/")}>BUSCO MI PARTIDO</p>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarBrand>
              <p className="font-bold text-inherit cursor-pointer"  onClick={() => navigate("/")}>BUSCO MI PARTIDO</p>
            </NavbarBrand>
            <NavbarItem  isActive>
              <Link color="foreground" href="/main">
                Inicio
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link href="#" aria-current="page">
                Buscar Rivales 
              </Link>
            </NavbarItem>
            <NavbarItem  isActive>
              <Link color="foreground" href="#">
                Crear Alerta
              </Link>
            </NavbarItem>
            <NavbarItem  isActive>
              <Link color="foreground" href="#">
                Mis Equipos
              </Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <Link href="#">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="warning" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>

          <NavbarMenu>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className="w-full"
                  color={
                    index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                  }
                  href="#"
                  size="lg"
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>
    </div>
  )
}

export default NavbarComponent

