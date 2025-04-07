import React from 'react';
import { Search, Download } from 'lucide-react';
import Sidebar from './Sidebar';

const FertilizerRecommendation = () => {
    const fields = [
        {
            id: 1,
            location: 'Kolkata',
            fieldName: 'Field 1-Rice',
            size: '10 acres',
            lastUpdated: '20th Dec',
            recommendations: {
                urea: '50 kg/acre',
                potassiumNitrate: '30 kg/acre',
                zincSulfate: '5 kg/acre',
                ph: '3'
            },
            notes: [
                'Ensure proper irrigation to maximize fertilizer absorption.',
                'Conduct a soil pH test for better results.'
            ]
        },
        {
            id: 2,
            location: 'Kolkata',
            fieldName: 'Field 1-Rice',
            size: '10 acres',
            lastUpdated: '20th Dec',
            recommendations: {
                urea: '50 kg/acre',
                potassiumNitrate: '30 kg/acre',
                zincSulfate: '5 kg/acre',
                ph: '3'
            },
            notes: [
                'Ensure proper irrigation to maximize fertilizer absorption.',
                'Conduct a soil pH test for better results.'
            ]
        }
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar></Sidebar>
            <div className='flex-1 overflow-auto'>
                <div className="p-6 pl-80">
                    <h1 className="text-3xl font-bold text-slate-800 lg:text-4xl">Fertilizer Recommendation</h1>
                    <p className="mt-2 text-slate-600">Fertilizer Recommendations for Your Fields</p>
                </div>

                <div className="mb-8 pl-80">
                    <div className="relative">
                        <Search className="absolute text-gray-400 left-3 top-3" size={20} />
                        <input
                            type="text"
                            placeholder="Search Field"
                            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>

                <div className="space-y-12 pl-80">
                    {fields.map((field) => (
                        <div key={field.id} className="overflow-hidden bg-white rounded-lg shadow-sm">
                            <div className="flex flex-col md:flex-row">
   
                                <div className="md:w-1/2">
                                    <div className="flex justify-between p-4">
                                        <div>
                                            <p className="font-medium text-gray-700">Location: {field.location}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-700">{field.fieldName}</p>
                                        </div>
                                    </div>

                                    <div className="relative h-64 md:h-80">
                                        <img
                                            src="https://s3-alpha-sig.figma.com/img/df5a/79f3/fe608e4f35eae8356deea0b18041275c?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SQHcDa~H8a~Utv4zipvdVArY9L53p8OIA1RWDqrR-iQO1xAmueF0gHG-dAVI5S4UTRpcC1DWMVFSdv4PCadLpsvtrrrcbMvlxNv6PCufuZJh4PnnJw~jI0gXUBwIseZSMnopjaxrnwdZ-FsyCljYqLMVlSCqhfIKyp5g0TbfH7p2EwEnvr6B6Nr5ptlUMkYBwLooYqquNd2vKVwriuyBQEcI1eKkQfhc0SMJ0rJy9Zv0OOl07LFX2Fg~AT7Oq-fXhHsj4oW34-m~VoGvklS-8KKwzC6tV7xlqUDa01UDon~bd~ua1CfKYe9wSUZcsSSi3ozObxYY9JiOXw5Te-0HGA__"
                                            alt="Field"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>

                                    <div className="flex justify-between p-4">
                                        <div>
                                            <p className="text-gray-700">Size: "{field.size}"</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-700">Last Updated: {field.lastUpdated}</p>
                                        </div>
                                    </div>
                                </div>


                                <div className="p-4 md:w-1/2">
                                    <div className="grid grid-cols-2 gap-4 mb-4">

                                        <div className="p-4 rounded-lg shadow-sm bg-gradient-to-r from-green-200 to-green-100">
                                            <h3 className="text-xl font-semibold text-gray-800">Urea</h3>
                                            <p className="mt-2 text-gray-700">{field.recommendations.urea}</p>
                                        </div>

           
                                        <div className="p-4 rounded-lg shadow-sm bg-gradient-to-r from-green-200 to-green-100">
                                            <h3 className="text-lg font-semibold text-gray-800">Potassium Nitrate</h3>
                                            <p className="mt-2 text-gray-700">{field.recommendations.potassiumNitrate}</p>
                                        </div>

                      
                                        <div className="p-4 rounded-lg shadow-sm bg-gradient-to-r from-green-200 to-green-100">
                                            <h3 className="text-xl font-semibold text-gray-800">Zinc Sulfate</h3>
                                            <p className="mt-2 text-gray-700">{field.recommendations.zincSulfate}</p>
                                        </div>

                              
                                        <div className="p-4 rounded-lg shadow-sm bg-gradient-to-r from-green-200 to-green-100">
                                            <h3 className="text-xl font-semibold text-gray-800">PH</h3>
                                            <p className="mt-2 text-4xl font-bold text-gray-800">{field.recommendations.ph}</p>
                                        </div>
                                    </div>

             
                                    <div className="p-4 mb-4 border border-yellow-100 rounded-lg bg-yellow-50">
                                        {field.notes.map((note, idx) => (
                                            <p key={idx} className="mb-1 text-gray-700">{note}</p>
                                        ))}
                                    </div>


                                    <button className="flex items-center justify-center w-full px-4 py-2 text-gray-800 transition-colors rounded-lg bg-gradient-to-r from-green-200 to-green-100 hover:from-green-300 hover:to-green-200">
                                        <Download size={18} className="mr-2" />
                                        Download full report
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FertilizerRecommendation;