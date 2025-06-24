import { SearchBar } from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import React from 'react'

const DashboardOverview = () => {
	return (
		<>
			<div className="flex gap-x-2" >
                <SearchBar />
                <Button>Add new</Button>
            </div>
		</>
	)
}

export default DashboardOverview
