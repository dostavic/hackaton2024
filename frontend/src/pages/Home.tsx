import Header from '../components/home/Header'
import Body from '../components/home/Body'
import Footer from '../components/home/Footer'

export default function Home() {
  return (
    <div
      className="flex flex-col min-h-screen bg-gradient-to-r to-[#D5CFE0] from-[#4F53B7]">
      <Header />
      <Body />
      <Footer />
    </div>
  )
}

