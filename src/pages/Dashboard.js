// pages/Dashboard.js
import StatsCards from '../components/ui/StatsCards';
import Traffic from '../components/ui/Traffic';
import Timeline from '../components/ui/Timeline';

export default function Dashboard() {
  return (
    <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
      {/* Breadcrumb */}
      <div className="row">
        <ol className="breadcrumb">
          <li><a href="/"><i className="fa fa-home"></i></a></li>
          <li className="active">Dashboard</li>
        </ol>
      </div>
      
      
      <StatsCards />
      
      {/* Main Chart */}
               <Traffic />

      <div className="row">
        <div className="col-md-6">
        </div>
        <div className="col-md-6">
        </div>
      </div>
    </div>
  );
}