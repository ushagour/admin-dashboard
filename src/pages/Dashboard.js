// pages/Dashboard.js
import StatsCards from '../components/ui/StatsCards';
import MainChart from '../components/ui/Charts';
import TodoList from '../components/ui/TodoList';
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
      
      <h1 className="page-header">Dashboard</h1>
      
      <StatsCards />
      
      {/* Main Chart */}
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              Site Traffic Overview
            </div>
            <div className="panel-body">
              <MainChart />
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6">
          <TodoList />
        </div>
        <div className="col-md-6">
          <Timeline />
        </div>
      </div>
    </div>
  );
}