import React, { Component } from "react";
import extend from "lodash/extend";
import {
  SearchkitManager,
  SearchkitProvider,
  SearchBox,
  RefinementListFilter,
  Pagination,
  HitsStats,
  SortingSelector,
  NoHits,
  ResetFilters,
  RangeFilter,
  NumericRefinementListFilter,
  ViewSwitcherHits,
  ViewSwitcherToggle,
  GroupedSelectedFilters,
  Layout,
  TopBar,
  LayoutBody,
  LayoutResults,
  ActionBar,
  ActionBarRow,
  SideBar
} from "searchkit";
import "./index.css";

const host = "http://localhost:9200/luisaviaroma-fifa";
const searchkit = new SearchkitManager(host);

const PlayerHitsGridItem = props => {
  const { bemBlocks, result } = props;
  const source = extend({}, result._source, result.highlight);
  return (
    <div
      className={bemBlocks.item().mix(bemBlocks.container("item"))}
      data-qa="hit"
    >
      <a href={result._source.Photo} target="_blank">
        <img
          data-qa="poster"
          alt="-"
          className={bemBlocks.item("poster")}
          src={result._source.Photo}
        />
        <img
          data-qa="poster"
          alt="-"
          className={bemBlocks.item("poster")}
          src={result._source["Club Logo"]}
        />
        <div
          data-qa="title"
          className={bemBlocks.item("title")}
          dangerouslySetInnerHTML={{ __html: source.Name }}
        />
      </a>
      <h5 className={bemBlocks.item("subtitle")}>
        Overall {source.Overall}/100
      </h5>
    </div>
  );
};

const PlayerHitsListItem = props => {
  const { bemBlocks, result } = props;
  const source = extend({}, result._source, result.highlight);
  return (
    <div
      className={bemBlocks.item().mix(bemBlocks.container("item"))}
      data-qa="hit"
    >
      <div className={bemBlocks.item("poster")}>
        <img alt="-" data-qa="poster" src={result._source.Photo} />
        <img
          alt="-"
          data-qa="poster"
          src={result._source["Club Logo"]}
        />
      </div>

      <div className={bemBlocks.item("details")}>
        <a href={result._source.Photo} target="_blank">
          <h2
            className={bemBlocks.item("title")}
            dangerouslySetInnerHTML={{ __html: source.Name }}
          />
        </a>
        <h3 className={bemBlocks.item("subtitle")}>
          Overall {source.Overall}/100
        </h3>
        <div
          className={bemBlocks.item("text")}
          dangerouslySetInnerHTML={{ __html: source.Position }}
        />
      </div>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout>
          <TopBar>
            <div className="my-logo">LuisaViaRoma Workshop</div>
            <SearchBox
              autofocus={true}
              searchOnChange={true}
              prefixQueryFields={["Name^2", "Club"]}
            />
          </TopBar>
          <LayoutBody>
            <SideBar>
              <RangeFilter
                min={0}
                max={100}
                field="Overall"
                id="Overall"
                title="Overall"
                showHistogram={true}
              />
              <NumericRefinementListFilter
                id="newValue"
                title="Value"
                field="newValue"
                options={[
                  { title: "All" },
                  { title: "up to 100K", from: 0, to: 100000 },
                  { title: "100K to 1M", from: 100000, to: 1000000 },
                  { title: "1M or 10M", from: 1000000, to: 10000000 },
                  { title: "10M or more", from: 10000000, to: 1000000000 }
                ]}
              />

              <RefinementListFilter
                id="Position"
                title="Position"
                field="Position"
                operator="OR"
                size={10}
              />
              <RefinementListFilter
                id="Club"
                title="Club"
                field="Club.keyword"
                operator="OR"
                size={10}
              />
              <RefinementListFilter
                id="Nationality"
                title="Nationality"
                field="Nationality"
                operator="OR"
                size={10}
              />
            </SideBar>
            <LayoutResults>
              <ActionBar>
                <ActionBarRow>
                  <HitsStats
                    translations={{
                      "hitstats.results_found": "{hitCount} results found"
                    }}
                  />
                  <ViewSwitcherToggle />
                  <SortingSelector
                    options={[
                      { label: "Relevance", field: "_score", order: "desc" },
                      { label: "TOP Player", field: "Overall", order: "desc" },
                      { label: "The worst", field: "Overall", order: "asc" }
                    ]}
                  />
                </ActionBarRow>

                <ActionBarRow>
                  <GroupedSelectedFilters />
                  <ResetFilters />
                </ActionBarRow>
              </ActionBar>
              <ViewSwitcherHits
                hitsPerPage={12}
                highlightFields={["Name"]}
                sourceFilter={[]}
                hitComponents={[
                  {
                    key: "grid",
                    title: "Grid",
                    itemComponent: PlayerHitsGridItem,
                    defaultOption: true
                  },
                  {
                    key: "list",
                    title: "List",
                    itemComponent: PlayerHitsListItem
                  }
                ]}
                scrollTo={false}
              />
              <NoHits suggestionsField={"Name"} />
              <Pagination showNumbers={true} />
            </LayoutResults>
          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default App;