import { Header, JsonTable, PageLayout } from './components';
import SearchContainer from './container/searchContainer';

function App() {
  return (
    <>
      <Header />
      <PageLayout>
        <JsonTable />
        <SearchContainer />
      </PageLayout>
    </>
  );
}

export default App;
