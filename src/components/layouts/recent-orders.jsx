import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const recentOrders = [
  {
    id: "#3210",
    customer: "Olivia Martin",
    email: "olivia.martin@email.com",
    status: "completed",
    amount: "$42.25",
    date: "2 hours ago",
  },
  {
    id: "#3209",
    customer: "Jackson Lee",
    email: "jackson.lee@email.com",
    status: "processing",
    amount: "$74.99",
    date: "4 hours ago",
  },
  {
    id: "#3208",
    customer: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    status: "completed",
    amount: "$99.99",
    date: "6 hours ago",
  },
  {
    id: "#3207",
    customer: "William Kim",
    email: "will@email.com",
    status: "pending",
    amount: "$39.95",
    date: "8 hours ago",
  },
  {
    id: "#3206",
    customer: "Sofia Davis",
    email: "sofia.davis@email.com",
    status: "completed",
    amount: "$19.99",
    date: "1 day ago",
  },
]

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800"
    case "processing":
      return "bg-blue-100 text-blue-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>You have 265 orders this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-sm font-medium leading-none">{order.customer}</p>
                  <p className="text-sm text-muted-foreground">{order.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                <div className="text-right">
                  <p className="text-sm font-medium">{order.amount}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>Update Status</DropdownMenuItem>
                    <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="outline" className="w-full">
            View All Orders
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
