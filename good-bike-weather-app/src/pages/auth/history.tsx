import { GetStaticProps, NextPage } from 'next'
import { getBrnoBikeAccidents } from '../../services/accidents'
import { BrnoBikeAccidentsResponse } from '../../types'

const HistoryPage: NextPage<{ data: BrnoBikeAccidentsResponse }> = ({ data }) => {
  return (
    <div>
      <h1>History page</h1>
      <h2 className="px-10 mt-10">Initial data for this page (accidents)</h2>
      <p className="text-xs mt-2 px-10">{JSON.stringify(data)}</p>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const brnoBikeAccidents = await getBrnoBikeAccidents()

  return {
    props: {
      data: brnoBikeAccidents,
    },
  }
}
export default HistoryPage
