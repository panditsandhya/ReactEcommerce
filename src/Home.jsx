import HeroSection from './components/HeroSection';
import FeatureProduct from './components/Featureproduct';
import Services from './components/Services';
import Trusted from './components/Trusted';


const Home = () =>  {
  const data = {
    name: "Ecommerce Store",
  };

  return (
    <>
      <HeroSection myData
      ={data} />
     <FeatureProduct />
      <Services />
      <Trusted />
    </>
  )

};

export default Home;