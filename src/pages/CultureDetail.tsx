
import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Download, Palette, Music, Theater, ShoppingBag } from 'lucide-react';
import { states } from '../data/states';
import { culturalData } from '../data/culture';
import PageTransition from '../components/PageTransition';

function CultureDetail() {
  const { id, state: statePath } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const stateData = states.find(s => s.path === statePath);
  const cultureItem = culturalData.find(c => c.id === Number(id));
  
  // Get related states (states that have similar cultural aspects)
  const relatedStates = states.filter(s => 
    s.path !== statePath && 
    s.culture.art.toLowerCase().includes(cultureItem?.title.toLowerCase() || '')
  ).slice(0, 3);

  useEffect(() => {
    if (stateData && cultureItem) {
      generateStateImage();
    }
  }, [stateData, cultureItem]);

  const generateStateImage = () => {
    if (!canvasRef.current) return;
    setIsGeneratingImage(true);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas dimensions
    canvas.width = 600;
    canvas.height = 400;
    
    // Create gradient background based on state name
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    
    // Use a different color scheme for each state
    const getColorScheme = (stateName: string) => {
      const colorMap: Record<string, string[]> = {
        'Rajasthan': ['#FF9671', '#FF6F91'],
        'Kerala': ['#33658A', '#55DDE0'],
        'Himachal Pradesh': ['#6A0572', '#AB83A1'],
        'Gujarat': ['#FFA600', '#FFBE0B'],
        'Tamil Nadu': ['#2A9D8F', '#264653']
      };
      
      return colorMap[stateName] || ['#9b87f5', '#7E69AB'];
    };
    
    const colors = getColorScheme(stateData?.name || '');
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(1, colors[1]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add state name in beautiful typography
    ctx.font = 'bold 48px Inter';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText(stateData?.name || '', canvas.width / 2, 80);
    
    // Add cultural element name
    ctx.font = 'normal 32px Inter';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(cultureItem?.title || '', canvas.width / 2, 130);
    
    // Draw decorative elements based on the cultural item type
    // Simplified abstract shapes to represent the culture
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 3;
    
    // Draw different patterns based on culture type
    if (cultureItem?.title.includes('Dance')) {
      drawDancePattern(ctx, canvas);
    } else if (cultureItem?.title.includes('Art')) {
      drawArtPattern(ctx, canvas);
    } else if (cultureItem?.title.includes('Music')) {
      drawMusicPattern(ctx, canvas);
    } else {
      drawDefaultPattern(ctx, canvas);
    }
    
    // Add elegant border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 10;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    
    // Save the generated image
    setGeneratedImage(canvas.toDataURL('image/jpeg'));
    setIsGeneratingImage(false);
  };
  
  const drawDancePattern = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Rhythmic circular patterns for dance
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2 + Math.cos(i * Math.PI / 2.5) * 100, 
        canvas.height / 2 + 50 + Math.sin(i * Math.PI / 2.5) * 100, 
        30 - i * 3, 
        0, 
        Math.PI * 2
      );
      ctx.stroke();
    }
  };
  
  const drawArtPattern = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Geometric patterns for art
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      ctx.moveTo(canvas.width / 2, canvas.height / 2 + 50);
      ctx.lineTo(
        canvas.width / 2 + Math.cos(i * Math.PI / 4) * 150,
        canvas.height / 2 + 50 + Math.sin(i * Math.PI / 4) * 150
      );
    }
    ctx.stroke();
  };
  
  const drawMusicPattern = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Wave patterns for music
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x += 10) {
      const y = Math.sin(x / 20) * 30 + canvas.height / 2 + 50;
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  };
  
  const drawDefaultPattern = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Dotted pattern for other cultural elements
    for (let i = 0; i < 100; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height / 2 + canvas.height / 2,
        2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  };
  
  const downloadImage = () => {
    if (!generatedImage) return;
    
    const a = document.createElement('a');
    a.href = generatedImage;
    a.download = `${stateData?.name}-${cultureItem?.title}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    })
  };
  
  if (!stateData || !cultureItem) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 flex items-center justify-center">
        <p className="text-2xl text-gray-300">Item not found</p>
      </div>
    );
  }

  const icons = {
    'Art': <Palette className="w-8 h-8" />,
    'Music': <Music className="w-8 h-8" />,
    'Dance': <Theater className="w-8 h-8" />,
    'Craft': <ShoppingBag className="w-8 h-8" />
  };

  const getIcon = (title: string) => {
    for (const [key, icon] of Object.entries(icons)) {
      if (title.includes(key)) {
        return icon;
      }
    }
    return <Palette className="w-8 h-8" />;
  };
  
  const culturalAspects = [
    { title: stateData.culture.art, type: 'Art Form' },
    { title: stateData.culture.dance, type: 'Dance Form' },
    { title: stateData.culture.festivals.join(', '), type: 'Festivals' },
    { title: stateData.culture.handicrafts.join(', '), type: 'Handicrafts' },
  ];
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-900 pt-24">
        {/* Hero Section */}
        <motion.div 
          className="relative h-[50vh] overflow-hidden"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={cultureItem.image}
            alt={cultureItem.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70" />
          <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
            <Link 
              to="/culture" 
              className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Cultural Heritage
            </Link>
            <div className="flex items-center gap-4">
              {getIcon(cultureItem.title)}
              <h1 className="text-5xl md:text-6xl font-bold">{cultureItem.title}</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mt-4">{cultureItem.description}</p>
            <div className="flex items-center gap-3 mt-6">
              <div className="px-4 py-1 bg-violet-600/20 rounded-full text-violet-400 border border-violet-500/30">
                {stateData.name}
              </div>
              {cultureItem.tags?.map((tag, i) => (
                <div key={i} className="px-4 py-1 bg-gray-800/60 rounded-full text-gray-300 border border-gray-700">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="col-span-2 space-y-12">
            {/* Auto-generated Visualization */}
            <motion.div 
              className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Artistic Visualization</h2>
              <div className="relative rounded-lg overflow-hidden mb-4">
                <canvas ref={canvasRef} className="hidden" />
                {generatedImage ? (
                  <img 
                    src={generatedImage} 
                    alt="Generated visualization" 
                    className="w-full rounded-lg shadow-2xl" 
                  />
                ) : (
                  <div className="bg-gray-700 h-[400px] rounded-lg flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                {generatedImage && (
                  <button
                    onClick={downloadImage}
                    className="absolute bottom-4 right-4 bg-violet-600/90 hover:bg-violet-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                )}
              </div>
              <p className="text-gray-400 text-sm italic">
                This is an artistic representation of {cultureItem.title} from {stateData.name}, generated uniquely for this view.
              </p>
            </motion.div>
            
            {/* Cultural Description */}
            <motion.div 
              className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-lg leading-relaxed">
                  {cultureItem.fullDescription || cultureItem.description}
                </p>
                <p className="text-lg leading-relaxed mt-4">
                  {stateData.name} is renowned for its rich cultural heritage, which includes various forms of art, dance, music,
                  and handicrafts. The region's distinctive cultural identity has been shaped by centuries of historical influences,
                  including royal patronage, religious practices, and geographical factors.
                </p>
                <p className="text-lg leading-relaxed mt-4">
                  The {cultureItem.title} represents an important aspect of {stateData.name}'s cultural legacy and continues
                  to be practiced and celebrated in contemporary times, serving as a link between the past and present.
                </p>
              </div>
            </motion.div>
            
            {/* Gallery */}
            <motion.div 
              className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Visual Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="relative aspect-video rounded-lg overflow-hidden group"
                    custom={i}
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={`https://source.unsplash.com/random/600x400/?${stateData.name},${cultureItem.title},${i}`}
                      alt={`${cultureItem.title} illustration ${i}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Cultural Aspects */}
            <motion.div 
              className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold mb-4">{stateData.name}'s Cultural Heritage</h3>
              <div className="space-y-4">
                {culturalAspects.map((aspect, i) => (
                  <div
                    key={i}
                    className="p-4 bg-gray-700/50 rounded-lg border border-gray-600"
                  >
                    <h4 className="text-violet-400 font-medium mb-1">{aspect.type}</h4>
                    <p className="text-gray-200">{aspect.title}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Information Card */}
            <motion.div 
              className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold mb-4">About {stateData.name}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Capital</span>
                  <span className="text-white font-medium">{stateData.capital}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Famous For</span>
                  <span className="text-white font-medium">{stateData.famous}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Type</span>
                  <span className="text-white font-medium">{stateData.isUT ? 'Union Territory' : 'State'}</span>
                </div>
                <div className="mt-4">
                  <Link
                    to={`/states/${stateData.path}`}
                    className="block w-full text-center px-4 py-2 bg-violet-600/20 hover:bg-violet-600/30 rounded-lg text-violet-400 border border-violet-500/30 transition-colors"
                  >
                    Explore {stateData.name}
                  </Link>
                </div>
              </div>
            </motion.div>
            
            {/* Related States */}
            <motion.div 
              className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold mb-4">Explore Other States</h3>
              <div className="space-y-4">
                {relatedStates.length > 0 ? (
                  relatedStates.map((state, i) => (
                    <Link
                      key={i}
                      to={`/states/${state.path}`}
                      className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <img
                        src={state.thumbnail}
                        alt={state.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <h4 className="font-medium">{state.name}</h4>
                        <p className="text-sm text-gray-400">{state.famous}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-400">No related states found.</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default CultureDetail;
