import React from 'react'
const skeletonArr = [1, 2, 3, 4, 5]
const CampaignItemListSkeleton = () => <div className="mx-3 divide-y">
    {
        skeletonArr.map((item, index) =>
            <div key={index} className="max-w-sm w-full mx-auto py-2">
                <div className="animate-pulse flex space-x-4">
                    <div className="bg-gray-400 rounded-xl h-20 w-20"></div>
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-6 bg-gray-400 rounded w-1/4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-400 rounded"></div>
                            <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
</div>
export default CampaignItemListSkeleton