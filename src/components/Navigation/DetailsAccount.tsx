import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { User } from "@supabase/supabase-js"
import { UserRoundCog } from "lucide-react"

interface DetailsAccountProps {
  user: User
  handleLogout: () => void
}

export  function DetailsAccount(props: DetailsAccountProps) {
  const { user, handleLogout } = props
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer flex items-center gap-2">
        <UserRoundCog className="size-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.user_metadata.display_name || "Usuario"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/profile">Perfil</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/ajustes">Ajustes</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant="destructive" size="sm" onClick={handleLogout} className="cursor-pointer">
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
