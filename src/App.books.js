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

const host = "http://localhost:9200/luisaviaroma-book";
const searchkit = new SearchkitManager(host);

const PlayerHitsListItem = props => {
  const { bemBlocks, result } = props;
  const source = extend({}, result._source, result.highlight);
  return (
    <div
      className={bemBlocks.item().mix(bemBlocks.container("item"))}
      data-qa="hit"
    >
      <div className={bemBlocks.item("poster")}>
        <img alt="-" data-qa="poster" src={source.image_url} />
      </div>
      
      <div className={bemBlocks.item("details")}>
        <a href={source.image_url} target="_blank">
          <h2
            className={bemBlocks.item("title")}
            dangerouslySetInnerHTML={{
              __html:
                source["book_title.italian"] ||
                source["book_title.english"] ||
                source["book_title"]
            }}
          />
        </a>
        <div
          className={bemBlocks.item("text")}
          dangerouslySetInnerHTML={{ __html: "Pagine: " + source.book_pages }}
        />
        <h3
          className={bemBlocks.item("subtitle")}
          dangerouslySetInnerHTML={{
            __html:
              source["book_desc.italian"] ||
              source["book_desc.english"] ||
              source["book_desc"]
          }}
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
              prefixQueryFields={[
                "book_title.italian^2",
                "book_title.english^2",
                "book_desc.italian",
                "book_desc.english"
              ]}
            />
          </TopBar>
          <LayoutBody>
            <SideBar>
              {/* TODO */}
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
                      {
                        label: "Most Voted",
                        field: "book_rating",
                        order: "desc"
                      }
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
                highlightFields={[
                  "book_title.italian",
                  "book_title.english",
                  "book_desc.italian",
                  "book_desc.english"
                ]}
                sourceFilter={[]}
                hitComponents={[
                  {
                    key: "list",
                    title: "List",
                    itemComponent: PlayerHitsListItem
                  }
                ]}
                scrollTo={false}
              />
              <NoHits suggestionsField={"book_authors"} />
              <Pagination showNumbers={true} />
            </LayoutResults>
          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default App;