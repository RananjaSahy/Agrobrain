export default function Dashboard() {
    function Card({ children }) {
      return <div className="bg-white shadow-lg rounded-2xl p-6">{children}</div>;
    }
  
    function CardContent({ children }) {
      return <div className="mt-2">{children}</div>;
    }
  
    return (
      <div className="flex h-screen bg-gradient-to-r from-green-100 to-white">
        {/* Sidebar */}
        <div className="w-1/4 bg-green-200 p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">AGROBRAIN</h1>
          </div>
          <ul className="space-y-2">
            <li className="font-semibold text-green-900">Dashboard</li>
            <li>Weather Details</li>
            <li>Fields</li>
            <li>Crop Recommendations</li>
            <li>Crop Diseases Detection</li>
            <li>Fertilizer Recommendations</li>
            <li>Market</li>
          </ul>
          <button className="mt-auto text-red-600">Logout</button>
        </div>
        
        {/* Main Content */}
        <div className="w-3/4 p-8">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p className="text-gray-600">Hello, John! Let's grow smarter today!</p>
          
          <div className="flex gap-4 mt-4">
            <Card>
              <p className="text-green-600 text-lg">100%</p>
              <p>Profile Completion</p>
            </Card>
            <Card>
              <p className="text-green-600 text-lg">3</p>
              <p>Badges Earned</p>
            </Card>
            <Card>
              <p className="text-green-600 text-lg">20</p>
              <p>Donations</p>
            </Card>
          </div>
          
          <h3 className="text-xl font-semibold mt-6">Farm Stats</h3>
          <div className="space-y-3 mt-2">
            <Card>
              <CardContent>Crop Analyses Performed: 15 analyses this month</CardContent>
            </Card>
            <Card>
              <CardContent>Disease Detections Completed: 3 detections this year</CardContent>
            </Card>
            <Card>
              <CardContent>Weather Reports Accessed: 30 reports checked this season</CardContent>
            </Card>
          </div>
          
          <h3 className="text-xl font-semibold mt-6">Progress</h3>
          <div className="mt-4">
            {/* Placeholder for Graph */}
            <div className="h-40 bg-gray-200 rounded-md flex items-center justify-center">
              Graph Placeholder
            </div>
          </div>
        </div>
      </div>
    );
  }
  