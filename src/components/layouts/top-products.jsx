import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const topProducts = [
  {
    name: "Wireless Headphones",
    sales: 1234,
    revenue: "$24,680",
    progress: 85,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Smart Watch",
    sales: 987,
    revenue: "$19,740",
    progress: 72,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Laptop Stand",
    sales: 756,
    revenue: "$15,120",
    progress: 58,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Phone Case",
    sales: 543,
    revenue: "$10,860",
    progress: 45,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "USB Cable",
    sales: 432,
    revenue: "$8,640",
    progress: 35,
    image: "/placeholder.svg?height=40&width=40",
  },
]

export function TopProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Best performing products this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {topProducts.map((product, index) => (
            <div key={product.name} className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-10 w-10 rounded-lg object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Progress value={product.progress} className="flex-1 h-2" />
                  <span className="text-xs text-muted-foreground">{product.progress}%</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{product.revenue}</p>
                <p className="text-xs text-muted-foreground">{product.sales} sold</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
