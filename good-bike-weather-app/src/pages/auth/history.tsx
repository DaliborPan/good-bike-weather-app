import { GetStaticProps, NextPage } from 'next'
import { getHistoryPageData } from '../../services/history'
import { HistoryPageData } from '../../types'

const HistoryPage: NextPage<{ data: HistoryPageData[] }> = ({ data }) => {
  return (
    <div>
      <h1>History page</h1>
      <h2 className="px-10 mt-10">Initial data for this page (accidents)</h2>
      <p className="text-xs mt-2 px-10">{JSON.stringify(data[0])}</p>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      data: await getHistoryPageData(),
    },
  }
}
export default HistoryPage
