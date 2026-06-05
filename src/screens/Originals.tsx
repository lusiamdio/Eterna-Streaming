import { TopNav } from '../components/Navigation';
import { CATALOG } from '../lib/data';
import { ContentCard } from '../components/Cards';
import { useMemo } from 'react';

export function OriginalsScreen() {
  const originals = useMemo(() => {
    // Generate over 20 based on the catalog
    let list = [...CATALOG, ...CATALOG].map((item, i) => ({
      ...item,
      id: item.id + i * 100,
      title: `Eterna Original: ${item.title} ${i + 1}`
    }));
    return list;
  }, []);

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <TopNav title="Originals" showSearch showProfile={false} showBack />
      
      <div className="pt-24 px-6 md:px-12">
        <h1 className="text-3xl font-black mb-2 uppercase tracking-wide">Eterna Originals</h1>
        <p className="text-white/50 mb-10 font-mono text-sm max-w-2xl">
          Exclusive produced and acquired films showcasing the best stories from Africa and around the world.
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {originals.map(item => (
            <div key={item.id} className="w-full">
              <ContentCard content={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
