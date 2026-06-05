import { TopNav } from '../components/Navigation';
import { CATALOG } from '../lib/data';
import { ContentCard } from '../components/Cards';
import { useMemo } from 'react';

export function SeriesScreen() {
  const seriesList = useMemo(() => {
    // Generate over 20 based on the catalog
    let list = [...CATALOG, ...CATALOG].map((item, i) => ({
      ...item,
      id: item.id + i * 100 + 500,
      title: `${item.title}: Series`,
      sub: `5 Seasons • 65 Episodes`
    }));
    return list;
  }, []);

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <TopNav title="Series" showSearch showProfile={false} showBack />
      
      <div className="pt-24 px-6 md:px-12">
        <h1 className="text-3xl font-black mb-2 uppercase tracking-wide">Global TV Series</h1>
        <p className="text-white/50 mb-10 font-mono text-sm max-w-2xl">
          Binge-worthy shows from across the world. Each featuring 5+ seasons and 13+ episodes to keep you hooked.
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {seriesList.map(item => (
            <div key={item.id} className="w-full">
              <ContentCard content={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
