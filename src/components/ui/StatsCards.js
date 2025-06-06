

export default function StatsCards() {
  const stats = [
    { icon: <em className="fa fa-xl fa-shopping-cart color-blue"></em>, value: 120, label: "New Orders", color: "blue" },
    { icon: <em className="fa fa-xl fa-comments color-orange"></em>, value: 52, label: "Comments", color: "orange" },
    { icon: <em className="fa fa-xl fa-users color-teal"></em>, value: 24, label: "New Users", color: "teal" },
    { icon: <em className="fa fa-xl fa-search color-red"></em>, value: "25.2k", label: "Page Views", color: "red" }
  ];

  return (
    <div className="panel panel-container">
      <div className="row">
        {/* Uncomment the following block to display stats cards */}
        {stats.map((stat, i) => (
          <div key={i} className="col-xs-6 col-md-3 col-lg-3 no-padding">
            <div className={`panel panel-${stat.color} panel-widget border-right`}>
              <div className="row no-padding">
                {stat.icon}
                <div className="large">{stat.value}</div>
                <div className="text-muted">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}