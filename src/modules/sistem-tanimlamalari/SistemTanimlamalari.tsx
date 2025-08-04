import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Tag,
  Ruler,
  Palette as PaletteIcon,
  Package,
  Truck,
  CreditCard
} from 'lucide-react';

function SistemTanimlamalari() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('kategoriler');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', description: '', color: '#3B82F6' });
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newSubcategory, setNewSubcategory] = useState({ name: '', description: '' });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Sample data - in real app this would come from database
  const [kategoriler, setKategoriler] = useState([
    { 
      id: 1, 
      name: '👕 Tekstil', 
      description: 'Giyim, ayakkabı ve aksesuar ürünleri', 
      active: true,
      parentId: null,
      subcategories: [
        { 
          id: 11, 
          name: 'Giyim', 
          description: 'Kadın, erkek ve çocuk giyim ürünleri', 
          active: true, 
          parentId: 1,
          subcategories: [
            { id: 111, name: 'Kadın Giyim', description: 'Kadın kıyafetleri', active: true, parentId: 11 },
            { id: 112, name: 'Erkek Giyim', description: 'Erkek kıyafetleri', active: true, parentId: 11 },
            { id: 113, name: 'Çocuk Giyim', description: 'Çocuk kıyafetleri', active: true, parentId: 11 },
            { id: 114, name: 'İç Giyim', description: 'İç çamaşırı ve pijama', active: true, parentId: 11 },
            { id: 115, name: 'Eşofman', description: 'Spor ve günlük eşofmanlar', active: true, parentId: 11 }
          ]
        },
        { 
          id: 12, 
          name: 'Ayakkabı', 
          description: 'Tüm ayakkabı çeşitleri', 
          active: true, 
          parentId: 1,
          subcategories: [
            { id: 121, name: 'Spor Ayakkabı', description: 'Koşu ve antrenman ayakkabıları', active: true, parentId: 12 },
            { id: 122, name: 'Sandalet', description: 'Yazlık sandalet modelleri', active: true, parentId: 12 },
            { id: 123, name: 'Bot', description: 'Kışlık bot çeşitleri', active: true, parentId: 12 },
            { id: 124, name: 'Topuklu Ayakkabı', description: 'Kadın topuklu ayakkabıları', active: true, parentId: 12 }
          ]
        },
        { 
          id: 13, 
          name: 'Aksesuar', 
          description: 'Çanta, şapka ve diğer aksesuarlar', 
          active: true, 
          parentId: 1,
          subcategories: [
            { id: 131, name: 'Çanta', description: 'El çantası, sırt çantası çeşitleri', active: true, parentId: 13 },
            { id: 132, name: 'Şapka', description: 'Bere, şapka, kasket modelleri', active: true, parentId: 13 },
            { id: 133, name: 'Kemer', description: 'Kadın ve erkek kemerleri', active: true, parentId: 13 },
            { id: 134, name: 'Gözlük', description: 'Güneş gözlüğü ve optik çerçeveler', active: true, parentId: 13 }
          ]
        }
      ]
    },
    { 
      id: 2, 
      name: '💻 Teknoloji', 
      description: 'Bilgisayar, telefon ve teknoloji ürünleri', 
      active: true,
      parentId: null,
      subcategories: [
        { 
          id: 21, 
          name: 'Bilgisayar', 
          description: 'Laptop, masaüstü ve mini PC', 
          active: true, 
          parentId: 2,
          subcategories: [
            { id: 211, name: 'Laptop', description: 'Dizüstü bilgisayarlar', active: true, parentId: 21 },
            { id: 212, name: 'Masaüstü', description: 'Masaüstü bilgisayarlar', active: true, parentId: 21 },
            { id: 213, name: 'Mini PC', description: 'Kompakt bilgisayarlar', active: true, parentId: 21 }
          ]
        },
        { 
          id: 22, 
          name: 'Telefon', 
          description: 'Akıllı telefon ve akıllı saat', 
          active: true, 
          parentId: 2,
          subcategories: [
            { id: 221, name: 'Akıllı Telefon', description: 'Smartphone modelleri', active: true, parentId: 22 },
            { id: 222, name: 'Akıllı Saat', description: 'Smartwatch çeşitleri', active: true, parentId: 22 }
          ]
        },
        { 
          id: 23, 
          name: 'Aksesuar', 
          description: 'Teknoloji aksesuarları', 
          active: true, 
          parentId: 2,
          subcategories: [
            { id: 231, name: 'Kulaklık', description: 'Kablolu ve kablosuz kulaklıklar', active: true, parentId: 23 },
            { id: 232, name: 'Klavye', description: 'Mekanik ve membran klavyeler', active: true, parentId: 23 },
            { id: 233, name: 'Powerbank', description: 'Taşınabilir şarj cihazları', active: true, parentId: 23 }
          ]
        },
        { 
          id: 24, 
          name: 'TV & Görüntü', 
          description: 'Televizyon ve görüntü cihazları', 
          active: true, 
          parentId: 2,
          subcategories: [
            { id: 241, name: 'Smart TV', description: 'Akıllı televizyonlar', active: true, parentId: 24 },
            { id: 242, name: 'Projektör', description: 'Ev ve ofis projektörleri', active: true, parentId: 24 }
          ]
        },
        { 
          id: 25, 
          name: 'Akıllı Ev', 
          description: 'Akıllı ev ürünleri', 
          active: true, 
          parentId: 2,
          subcategories: [
            { id: 251, name: 'Robot Süpürge', description: 'Otomatik temizlik robotları', active: true, parentId: 25 },
            { id: 252, name: 'Akıllı Priz', description: 'Uzaktan kontrollü prizler', active: true, parentId: 25 }
          ]
        }
      ]
    },
    { 
      id: 3, 
      name: '🍪 Gıda', 
      description: 'Kuru gıda, içecek ve atıştırmalık ürünleri', 
      active: true,
      parentId: null,
      subcategories: [
        { 
          id: 31, 
          name: 'Kuru Gıda', 
          description: 'Bakliyat, pirinç ve tahıl ürünleri', 
          active: true, 
          parentId: 3,
          subcategories: [
            { id: 311, name: 'Bakliyat', description: 'Fasulye, nohut, mercimek', active: true, parentId: 31 },
            { id: 312, name: 'Pirinç', description: 'Çeşitli pirinç türleri', active: true, parentId: 31 },
            { id: 313, name: 'Bulgur', description: 'Farklı bulgur çeşitleri', active: true, parentId: 31 }
          ]
        },
        { 
          id: 32, 
          name: 'İçecek', 
          description: 'Su, meyve suyu ve süt ürünleri', 
          active: true, 
          parentId: 3,
          subcategories: [
            { id: 321, name: 'Su', description: 'İçme suyu çeşitleri', active: true, parentId: 32 },
            { id: 322, name: 'Meyve Suyu', description: 'Doğal ve konsantre meyve suları', active: true, parentId: 32 },
            { id: 323, name: 'Süt', description: 'Tam yağlı, yarım yağlı süt', active: true, parentId: 32 }
          ]
        },
        { 
          id: 33, 
          name: 'Atıştırmalık', 
          description: 'Cips, kuruyemiş ve bisküvi', 
          active: true, 
          parentId: 3,
          subcategories: [
            { id: 331, name: 'Cips', description: 'Patates cipsi çeşitleri', active: true, parentId: 33 },
            { id: 332, name: 'Kuruyemiş', description: 'Fındık, fıstık, badem', active: true, parentId: 33 },
            { id: 333, name: 'Bisküvi', description: 'Çikolatalı, sade bisküviler', active: true, parentId: 33 }
          ]
        }
      ]
    },
    { 
      id: 4, 
      name: '🧴 Kozmetik', 
      description: 'Cilt bakımı, saç bakımı ve makyaj ürünleri', 
      active: true,
      parentId: null,
      subcategories: [
        { 
          id: 41, 
          name: 'Cilt Bakımı', 
          description: 'Krem, serum ve temizleyici ürünler', 
          active: true, 
          parentId: 4,
          subcategories: [
            { id: 411, name: 'Krem', description: 'Nemlendirici ve anti-aging kremler', active: true, parentId: 41 },
            { id: 412, name: 'Serum', description: 'Yoğunlaştırılmış bakım serumları', active: true, parentId: 41 },
            { id: 413, name: 'Temizleyici', description: 'Yüz temizleme ürünleri', active: true, parentId: 41 }
          ]
        },
        { 
          id: 42, 
          name: 'Saç Bakımı', 
          description: 'Şampuan ve saç maskesi ürünleri', 
          active: true, 
          parentId: 4,
          subcategories: [
            { id: 421, name: 'Şampuan', description: 'Farklı saç tipleri için şampuan', active: true, parentId: 42 },
            { id: 422, name: 'Maske', description: 'Besleyici saç maskeleri', active: true, parentId: 42 }
          ]
        },
        { 
          id: 43, 
          name: 'Makyaj', 
          description: 'Ruj, fondöten ve maskara ürünleri', 
          active: true, 
          parentId: 4,
          subcategories: [
            { id: 431, name: 'Ruj', description: 'Mat ve parlak ruj çeşitleri', active: true, parentId: 43 },
            { id: 432, name: 'Fondöten', description: 'Farklı ton fondöten ürünleri', active: true, parentId: 43 },
            { id: 433, name: 'Maskara', description: 'Uzatıcı ve kalınlaştırıcı maskara', active: true, parentId: 43 }
          ]
        }
      ]
    },
    { 
      id: 5, 
      name: '📚 Kırtasiye', 
      description: 'Yazı gereçleri, defter ve sanat malzemeleri', 
      active: true,
      parentId: null,
      subcategories: [
        { 
          id: 51, 
          name: 'Yazı Gereçleri', 
          description: 'Kalem, silgi ve fosforlu kalem', 
          active: true, 
          parentId: 5,
          subcategories: [
            { id: 511, name: 'Kalem', description: 'Tükenmez, kurşun kalem çeşitleri', active: true, parentId: 51 },
            { id: 512, name: 'Silgi', description: 'Farklı boyut silgiler', active: true, parentId: 51 },
            { id: 513, name: 'Fosforlu Kalem', description: 'Renkli işaretleme kalemleri', active: true, parentId: 51 }
          ]
        },
        { 
          id: 52, 
          name: 'Defter & Kağıt', 
          description: 'Spiralli defter ve çizgili kağıt', 
          active: true, 
          parentId: 5,
          subcategories: [
            { id: 521, name: 'Spiralli Defter', description: 'Farklı sayfa sayılı defterler', active: true, parentId: 52 },
            { id: 522, name: 'Çizgili Kağıt', description: 'A4 çizgili kağıt paketleri', active: true, parentId: 52 }
          ]
        },
        { 
          id: 53, 
          name: 'Sanat Malzemeleri', 
          description: 'Boya, fırça ve resim defteri', 
          active: true, 
          parentId: 5,
          subcategories: [
            { id: 531, name: 'Boya', description: 'Sulu boya, pastel boya çeşitleri', active: true, parentId: 53 },
            { id: 532, name: 'Fırça', description: 'Resim fırçası setleri', active: true, parentId: 53 },
            { id: 533, name: 'Resim Defteri', description: 'Çizim ve boyama defterleri', active: true, parentId: 53 }
          ]
        }
      ]
    },
    { 
      id: 6, 
      name: '🛋️ Mobilya', 
      description: 'Oturma odası, yatak odası ve çocuk odası mobilyaları', 
      active: true,
      parentId: null,
      subcategories: [
        { 
          id: 61, 
          name: 'Oturma Odası', 
          description: 'Koltuk ve TV ünitesi', 
          active: true, 
          parentId: 6,
          subcategories: [
            { id: 611, name: 'Koltuk', description: 'Tekli, ikili, üçlü koltuk takımları', active: true, parentId: 61 },
            { id: 612, name: 'TV Ünitesi', description: 'Modern TV sehpaları', active: true, parentId: 61 }
          ]
        },
        { 
          id: 62, 
          name: 'Yatak Odası', 
          description: 'Karyola, komodin ve dolap', 
          active: true, 
          parentId: 6,
          subcategories: [
            { id: 621, name: 'Karyola', description: 'Tek ve çift kişilik yataklar', active: true, parentId: 62 },
            { id: 622, name: 'Komodin', description: 'Yatak yanı komodin modelleri', active: true, parentId: 62 },
            { id: 623, name: 'Dolap', description: 'Gardırop ve giyinme odası', active: true, parentId: 62 }
          ]
        },
        { 
          id: 63, 
          name: 'Çocuk Odası', 
          description: 'Çalışma masası ve ranza', 
          active: true, 
          parentId: 6,
          subcategories: [
            { id: 631, name: 'Çalışma Masası', description: 'Çocuk ders masaları', active: true, parentId: 63 },
            { id: 632, name: 'Ranza', description: 'İki katlı çocuk yatakları', active: true, parentId: 63 }
          ]
        }
      ]
    },
    { 
      id: 7, 
      name: '🎮 Oyun & Konsol', 
      description: 'Konsollar, oyunlar ve aksesuarlar', 
      active: true,
      parentId: null,
      subcategories: [
        { 
          id: 71, 
          name: 'Konsollar', 
          description: 'PlayStation, Xbox ve Nintendo', 
          active: true, 
          parentId: 7,
          subcategories: [
            { id: 711, name: 'PlayStation', description: 'Sony PlayStation konsolları', active: true, parentId: 71 },
            { id: 712, name: 'Xbox', description: 'Microsoft Xbox konsolları', active: true, parentId: 71 },
            { id: 713, name: 'Nintendo', description: 'Nintendo Switch ve aksesuarları', active: true, parentId: 71 }
          ]
        },
        { 
          id: 72, 
          name: 'Oyunlar', 
          description: 'Dijital kod ve fiziksel CD', 
          active: true, 
          parentId: 7,
          subcategories: [
            { id: 721, name: 'Dijital Kod', description: 'Online oyun kodları', active: true, parentId: 72 },
            { id: 722, name: 'Fiziksel CD', description: 'Oyun CD ve DVD\'leri', active: true, parentId: 72 }
          ]
        },
        { 
          id: 73, 
          name: 'Aksesuarlar', 
          description: 'Kumanda ve headset', 
          active: true, 
          parentId: 7,
          subcategories: [
            { id: 731, name: 'Kumanda', description: 'Oyun kumandaları', active: true, parentId: 73 },
            { id: 732, name: 'Headset', description: 'Gaming kulaklıkları', active: true, parentId: 73 }
          ]
        }
      ]
    },
    { 
      id: 8, 
      name: '🏠 Ev & Yaşam', 
      description: 'Ev tekstili, dekorasyon ve mutfak ürünleri', 
      active: true,
      parentId: null,
      subcategories: [
        { 
          id: 81, 
          name: 'Ev Tekstili', 
          description: 'Nevresim, yastık ve perde', 
          active: true, 
          parentId: 8,
          subcategories: [
            { id: 811, name: 'Nevresim', description: 'Çift ve tek kişilik nevresim takımları', active: true, parentId: 81 },
            { id: 812, name: 'Yastık', description: 'Uyku ve dekoratif yastıklar', active: true, parentId: 81 },
            { id: 813, name: 'Perde', description: 'Salon ve yatak odası perdeleri', active: true, parentId: 81 }
          ]
        },
        { 
          id: 82, 
          name: 'Dekorasyon', 
          description: 'Mum, tablo ve çerçeve', 
          active: true, 
          parentId: 8,
          subcategories: [
            { id: 821, name: 'Mum', description: 'Kokulu ve dekoratif mumlar', active: true, parentId: 82 },
            { id: 822, name: 'Tablo', description: 'Duvar tabloları ve posterler', active: true, parentId: 82 },
            { id: 823, name: 'Çerçeve', description: 'Fotoğraf ve tablo çerçeveleri', active: true, parentId: 82 }
          ]
        },
        { 
          id: 83, 
          name: 'Mutfak', 
          description: 'Tencere, tabak ve bardak', 
          active: true, 
          parentId: 8,
          subcategories: [
            { id: 831, name: 'Tencere', description: 'Çelik ve granit tencere setleri', active: true, parentId: 83 },
            { id: 832, name: 'Tabak', description: 'Yemek ve servis tabakları', active: true, parentId: 83 },
            { id: 833, name: 'Bardak', description: 'Su, çay ve kahve bardakları', active: true, parentId: 83 }
          ]
        }
      ]
    },
    { 
      id: 9, 
      name: '🍼 Anne & Bebek', 
      description: 'Bebek giyim, bakım ürünleri ve beslenme', 
      active: true,
      parentId: null,
      subcategories: [
        { 
          id: 91, 
          name: 'Bebek Giyim', 
          description: 'Zıbın ve tulum', 
          active: true, 
          parentId: 9,
          subcategories: [
            { id: 911, name: 'Zıbın', description: 'Yenidoğan zıbın setleri', active: true, parentId: 91 },
            { id: 912, name: 'Tulum', description: 'Bebek tulum modelleri', active: true, parentId: 91 }
          ]
        },
        { 
          id: 92, 
          name: 'Bakım Ürünleri', 
          description: 'Islak mendil ve krem', 
          active: true, 
          parentId: 9,
          subcategories: [
            { id: 921, name: 'Islak Mendil', description: 'Bebek temizlik mendilleri', active: true, parentId: 92 },
            { id: 922, name: 'Krem', description: 'Bebek bakım kremleri', active: true, parentId: 92 }
          ]
        },
        { 
          id: 93, 
          name: 'Beslenme', 
          description: 'Mama, biberon ve emzik', 
          active: true, 
          parentId: 9,
          subcategories: [
            { id: 931, name: 'Mama', description: 'Bebek maması çeşitleri', active: true, parentId: 93 },
            { id: 932, name: 'Biberon', description: 'Cam ve plastik biberonlar', active: true, parentId: 93 },
            { id: 933, name: 'Emzik', description: 'Ortodontik emzik modelleri', active: true, parentId: 93 }
          ]
        }
      ]
    },
    { 
      id: 10, 
      name: '🚗 Otomotiv & Aksesuar', 
      description: 'Araç aksesuarları, parçalar ve temizlik ürünleri', 
      active: true,
      parentId: null,
      subcategories: [
        { 
          id: 101, 
          name: 'Araç Aksesuarları', 
          description: 'Koltuk kılıfı ve cam filmi', 
          active: true, 
          parentId: 10,
          subcategories: [
            { id: 1011, name: 'Koltuk Kılıfı', description: 'Deri ve kumaş koltuk kılıfları', active: true, parentId: 101 },
            { id: 1012, name: 'Cam Filmi', description: 'Güneş koruyucu cam filmleri', active: true, parentId: 101 }
          ]
        },
        { 
          id: 102, 
          name: 'Parçalar', 
          description: 'Akü, ampul ve fren diski', 
          active: true, 
          parentId: 10,
          subcategories: [
            { id: 1021, name: 'Akü', description: 'Araç aküsü çeşitleri', active: true, parentId: 102 },
            { id: 1022, name: 'Ampul', description: 'Far ve sinyal ampulleri', active: true, parentId: 102 },
            { id: 1023, name: 'Fren Diski', description: 'Ön ve arka fren diskleri', active: true, parentId: 102 }
          ]
        },
        { 
          id: 103, 
          name: 'Temizlik & Bakım', 
          description: 'Şampuan ve cilalama spreyi', 
          active: true, 
          parentId: 10,
          subcategories: [
            { id: 1031, name: 'Şampuan', description: 'Araç yıkama şampuanları', active: true, parentId: 103 },
            { id: 1032, name: 'Cilalama Spreyi', description: 'Araç cilalama ürünleri', active: true, parentId: 103 }
          ]
        }
      ]
    },
    { 
      id: 11, 
      name: '🧳 Seyahat & Outdoor', 
      description: 'Valiz, kamp malzemeleri ve seyahat aksesuarları', 
      active: true,
      parentId: null,
      subcategories: [
        { 
          id: 111, 
          name: 'Valiz', 
          description: 'Kabin boy, orta boy ve büyük boy', 
          active: true, 
          parentId: 11,
          subcategories: [
            { id: 1111, name: 'Kabin Boy', description: 'Uçak kabini için valiz', active: true, parentId: 111 },
            { id: 1112, name: 'Orta Boy', description: 'Orta mesafe seyahat valizleri', active: true, parentId: 111 },
            { id: 1113, name: 'Büyük Boy', description: 'Uzun seyahat valizleri', active: true, parentId: 111 }
          ]
        },
        { 
          id: 112, 
          name: 'Kamp Malzemeleri', 
          description: 'Çadır, mat ve kamp ocağı', 
          active: true, 
          parentId: 11,
          subcategories: [
            { id: 1121, name: 'Çadır', description: 'Farklı kişi kapasiteli çadırlar', active: true, parentId: 112 },
            { id: 1122, name: 'Mat', description: 'Uyku matı ve yoga matı', active: true, parentId: 112 },
            { id: 1123, name: 'Kamp Ocağı', description: 'Portatif kamp ocakları', active: true, parentId: 112 }
          ]
        },
        { 
          id: 113, 
          name: 'Seyahat Aksesuarları', 
          description: 'Seyahat yastığı ve organizer', 
          active: true, 
          parentId: 11,
          subcategories: [
            { id: 1131, name: 'Seyahat Yastığı', description: 'Boyun destekli yastıklar', active: true, parentId: 113 },
            { id: 1132, name: 'Organizer', description: 'Valiz düzenleyici çantalar', active: true, parentId: 113 }
          ]
        }
      ]
    },
    { 
      id: 12, 
      name: '🧘 Spor & Sağlık', 
      description: 'Spor giyim, fitness ekipmanı ve sağlık ürünleri', 
      active: true,
      parentId: null,
      subcategories: [
        { 
          id: 121, 
          name: 'Spor Giyim', 
          description: 'Tayt, atlet ve spor ayakkabı', 
          active: true, 
          parentId: 12,
          subcategories: [
            { id: 1211, name: 'Tayt', description: 'Kadın ve erkek spor taytları', active: true, parentId: 121 },
            { id: 1212, name: 'Atlet', description: 'Spor atletleri', active: true, parentId: 121 },
            { id: 1213, name: 'Spor Ayakkabı', description: 'Koşu ve antrenman ayakkabıları', active: true, parentId: 121 }
          ]
        },
        { 
          id: 122, 
          name: 'Fitness Ekipmanı', 
          description: 'Dambıl, yoga matı ve barfiks', 
          active: true, 
          parentId: 12,
          subcategories: [
            { id: 1221, name: 'Dambıl', description: 'Ayarlanabilir dambıl setleri', active: true, parentId: 122 },
            { id: 1222, name: 'Yoga Matı', description: 'Anti-slip yoga matları', active: true, parentId: 122 },
            { id: 1223, name: 'Barfiks', description: 'Kapı barfiks çubukları', active: true, parentId: 122 }
          ]
        },
        { 
          id: 123, 
          name: 'Sağlık Ürünleri', 
          description: 'Termometre ve tansiyon aleti', 
          active: true, 
          parentId: 12,
          subcategories: [
            { id: 1231, name: 'Termometre', description: 'Dijital termometre çeşitleri', active: true, parentId: 123 },
            { id: 1232, name: 'Tansiyon Aleti', description: 'Dijital tansiyon ölçüm cihazları', active: true, parentId: 123 }
          ]
        }
      ]
    },
    { 
      id: 13, 
      name: '🐶 Evcil Hayvan Ürünleri', 
      description: 'Mama, oyuncak ve bakım ürünleri', 
      active: true,
      parentId: null,
      subcategories: [
        { 
          id: 131, 
          name: 'Mama', 
          description: 'Kedi maması ve köpek maması', 
          active: true, 
          parentId: 13,
          subcategories: [
            { id: 1311, name: 'Kedi Maması', description: 'Yavru ve yetişkin kedi maması', active: true, parentId: 131 },
            { id: 1312, name: 'Köpek Maması', description: 'Küçük ve büyük ırk köpek maması', active: true, parentId: 131 }
          ]
        },
        { 
          id: 132, 
          name: 'Oyuncak', 
          description: 'Top ve diş kaşıyıcı', 
          active: true, 
          parentId: 13,
          subcategories: [
            { id: 1321, name: 'Top', description: 'Evcil hayvan oyun topları', active: true, parentId: 132 },
            { id: 1322, name: 'Diş Kaşıyıcı', description: 'Köpek diş kaşıma oyuncakları', active: true, parentId: 132 }
          ]
        },
        { 
          id: 133, 
          name: 'Bakım Ürünleri', 
          description: 'Tıraş makinesi ve tüy fırçası', 
          active: true, 
          parentId: 13,
          subcategories: [
            { id: 1331, name: 'Tıraş Makinesi', description: 'Evcil hayvan tıraş makineleri', active: true, parentId: 133 },
            { id: 1332, name: 'Tüy Fırçası', description: 'Tüy bakım fırçaları', active: true, parentId: 133 }
          ]
        }
      ]
    },
    { 
      id: 14, 
      name: '💍 Takı & Aksesuar', 
      description: 'Takı, gözlük ve saat ürünleri', 
      active: true,
      parentId: null,
      subcategories: [
        { 
          id: 141, 
          name: 'Takı', 
          description: 'Kolye, küpe ve bileklik', 
          active: true, 
          parentId: 14,
          subcategories: [
            { id: 1411, name: 'Kolye', description: 'Altın, gümüş ve çelik kolyeler', active: true, parentId: 141 },
            { id: 1412, name: 'Küpe', description: 'Sallantılı ve sade küpe modelleri', active: true, parentId: 141 },
            { id: 1413, name: 'Bileklik', description: 'Zincir ve charm bileklikler', active: true, parentId: 141 }
          ]
        },
        { 
          id: 142, 
          name: 'Gözlük', 
          description: 'Güneş gözlüğü ve numara gözlüğü', 
          active: true, 
          parentId: 14,
          subcategories: [
            { id: 1421, name: 'Güneş Gözlüğü', description: 'UV korumalı güneş gözlükleri', active: true, parentId: 142 },
            { id: 1422, name: 'Numara Gözlüğü', description: 'Optik çerçeve modelleri', active: true, parentId: 142 }
          ]
        },
        { 
          id: 143, 
          name: 'Saat', 
          description: 'Akıllı saat ve klasik saat', 
          active: true, 
          parentId: 14,
          subcategories: [
            { id: 1431, name: 'Akıllı Saat', description: 'Fitness ve smartwatch modelleri', active: true, parentId: 143 },
            { id: 1432, name: 'Klasik Saat', description: 'Analog ve dijital saat çeşitleri', active: true, parentId: 143 }
          ]
        }
      ]
    }
  ]);

  const [bedenler, setBedenler] = useState([
    { id: 1, name: 'XS', description: 'Extra Small', category: 'Giyim', active: true },
    { id: 2, name: 'S', description: 'Small', category: 'Giyim', active: true },
    { id: 3, name: 'M', description: 'Medium', category: 'Giyim', active: true },
    { id: 4, name: 'L', description: 'Large', category: 'Giyim', active: true },
    { id: 5, name: 'XL', description: 'Extra Large', category: 'Giyim', active: true },
    { id: 6, name: '36', description: '36 Numara', category: 'Ayakkabı', active: true },
    { id: 7, name: '37', description: '37 Numara', category: 'Ayakkabı', active: true },
    { id: 8, name: '38', description: '38 Numara', category: 'Ayakkabı', active: true },
    { id: 9, name: '39', description: '39 Numara', category: 'Ayakkabı', active: true },
    { id: 10, name: '40', description: '40 Numara', category: 'Ayakkabı', active: true }
  ]);

  const [renkler, setRenkler] = useState([
    { id: 1, name: 'Siyah', description: 'Siyah renk', color: '#000000', active: true },
    { id: 2, name: 'Beyaz', description: 'Beyaz renk', color: '#FFFFFF', active: true },
    { id: 3, name: 'Kırmızı', description: 'Kırmızı renk', color: '#EF4444', active: true },
    { id: 4, name: 'Mavi', description: 'Mavi renk', color: '#3B82F6', active: true },
    { id: 5, name: 'Yeşil', description: 'Yeşil renk', color: '#10B981', active: true },
    { id: 6, name: 'Sarı', description: 'Sarı renk', color: '#F59E0B', active: true },
    { id: 7, name: 'Pembe', description: 'Pembe renk', color: '#EC4899', active: true },
    { id: 8, name: 'Gri', description: 'Gri renk', color: '#6B7280', active: true }
  ]);

  const [markalar, setMarkalar] = useState([
    // Tekstil Markaları
    { id: 1, name: 'LC Waikiki', description: 'Uygun fiyatlı moda markası', category: 'Tekstil', active: true },
    { id: 2, name: 'Zara', description: 'Fast fashion markası', category: 'Tekstil', active: true },
    { id: 3, name: 'Mavi', description: 'Denim ve casual giyim', category: 'Tekstil', active: true },
    
    // Teknoloji Markaları
    { id: 4, name: 'Apple', description: 'Premium teknoloji markası', category: 'Teknoloji', active: true },
    { id: 5, name: 'Samsung', description: 'Elektronik ve teknoloji', category: 'Teknoloji', active: true },
    { id: 6, name: 'Lenovo', description: 'Bilgisayar ve laptop markası', category: 'Teknoloji', active: true },
    { id: 7, name: 'Xiaomi', description: 'Akıllı telefon ve teknoloji', category: 'Teknoloji', active: true },
    
    // Gıda Markaları
    { id: 8, name: 'Ülker', description: 'Gıda ve atıştırmalık markası', category: 'Gıda', active: true },
    { id: 9, name: 'Torku', description: 'Bisküvi ve şekerleme', category: 'Gıda', active: true },
    { id: 10, name: 'Eti', description: 'Gıda ürünleri markası', category: 'Gıda', active: true },
    
    // Kozmetik Markaları
    { id: 11, name: 'L\'Oréal', description: 'Uluslararası kozmetik markası', category: 'Kozmetik', active: true },
    { id: 12, name: 'Nivea', description: 'Cilt bakım ürünleri', category: 'Kozmetik', active: true },
    { id: 13, name: 'Golden Rose', description: 'Makyaj ürünleri markası', category: 'Kozmetik', active: true },
    
    // Kırtasiye Markaları
    { id: 14, name: 'Faber-Castell', description: 'Yazı gereçleri markası', category: 'Kırtasiye', active: true },
    { id: 15, name: 'Stabilo', description: 'Kalem ve işaretleme ürünleri', category: 'Kırtasiye', active: true },
    { id: 16, name: 'Deli', description: 'Ofis ve kırtasiye malzemeleri', category: 'Kırtasiye', active: true },
    
    // Mobilya Markaları
    { id: 17, name: 'IKEA', description: 'İsveç mobilya markası', category: 'Mobilya', active: true },
    { id: 18, name: 'Bellona', description: 'Türk mobilya markası', category: 'Mobilya', active: true },
    { id: 19, name: 'Doğtaş', description: 'Mobilya ve dekorasyon', category: 'Mobilya', active: true },
    
    // Oyun & Konsol Markaları
    { id: 20, name: 'Sony', description: 'PlayStation ve elektronik', category: 'Oyun & Konsol', active: true },
    { id: 21, name: 'Microsoft', description: 'Xbox ve yazılım', category: 'Oyun & Konsol', active: true },
    { id: 22, name: 'Logitech', description: 'Gaming aksesuarları', category: 'Oyun & Konsol', active: true },
    
    // Ev & Yaşam Markaları
    { id: 23, name: 'Taç', description: 'Ev tekstili markası', category: 'Ev & Yaşam', active: true },
    { id: 24, name: 'Karaca', description: 'Ev eşyaları ve mutfak', category: 'Ev & Yaşam', active: true },
    { id: 25, name: 'Paşabahçe', description: 'Cam ve mutfak ürünleri', category: 'Ev & Yaşam', active: true },
    
    // Anne & Bebek Markaları
    { id: 26, name: 'Baby Turco', description: 'Bebek bakım ürünleri', category: 'Anne & Bebek', active: true },
    { id: 27, name: 'Philips Avent', description: 'Bebek beslenme ürünleri', category: 'Anne & Bebek', active: true },
    { id: 28, name: 'Molfix', description: 'Bebek bezi markası', category: 'Anne & Bebek', active: true },
    
    // Otomotiv Markaları
    { id: 29, name: 'Bosch', description: 'Otomotiv parçaları', category: 'Otomotiv & Aksesuar', active: true },
    { id: 30, name: 'Castrol', description: 'Motor yağı markası', category: 'Otomotiv & Aksesuar', active: true },
    { id: 31, name: 'Meguiar\'s', description: 'Araç bakım ürünleri', category: 'Otomotiv & Aksesuar', active: true },
    
    // Seyahat & Outdoor Markaları
    { id: 32, name: 'Samsonite', description: 'Valiz ve seyahat çantası', category: 'Seyahat & Outdoor', active: true },
    { id: 33, name: 'Decathlon', description: 'Spor ve outdoor ürünleri', category: 'Seyahat & Outdoor', active: true },
    { id: 34, name: 'Quechua', description: 'Kamp ve doğa sporları', category: 'Seyahat & Outdoor', active: true },
    
    // Spor & Sağlık Markaları
    { id: 35, name: 'Nike', description: 'Spor giyim ve ayakkabı', category: 'Spor & Sağlık', active: true },
    { id: 36, name: 'Adidas', description: 'Spor malzemeleri', category: 'Spor & Sağlık', active: true },
    { id: 37, name: 'Voit', description: 'Fitness ekipmanları', category: 'Spor & Sağlık', active: true },
    
    // Evcil Hayvan Markaları
    { id: 38, name: 'Pro Plan', description: 'Premium pet food markası', category: 'Evcil Hayvan Ürünleri', active: true },
    { id: 39, name: 'Reflex', description: 'Kedi ve köpek maması', category: 'Evcil Hayvan Ürünleri', active: true },
    { id: 40, name: 'Royal Canin', description: 'Veteriner hekim önerisi', category: 'Evcil Hayvan Ürünleri', active: true },
    
    // Takı & Aksesuar Markaları
    { id: 41, name: 'Swatch', description: 'İsviçre saat markası', category: 'Takı & Aksesuar', active: true },
    { id: 42, name: 'Fossil', description: 'Saat ve aksesuar', category: 'Takı & Aksesuar', active: true },
    { id: 43, name: 'Daniel Klein', description: 'Klasik saat markası', category: 'Takı & Aksesuar', active: true }
  ]);

  const [kargolar, setKargolar] = useState([
    { id: 1, name: 'Aras Kargo', description: 'Hızlı teslimat', price: 15, active: true },
    { id: 2, name: 'MNG Kargo', description: 'Güvenilir teslimat', price: 12, active: true },
    { id: 3, name: 'PTT Kargo', description: 'Ekonomik teslimat', price: 10, active: true },
    { id: 4, name: 'Yurtiçi Kargo', description: 'Yaygın ağ', price: 14, active: true }
  ]);

  const [odemeler, setOdemeler] = useState([
    { id: 1, name: 'Kredi Kartı', description: 'Visa, Mastercard, Troy', active: true },
    { id: 2, name: 'Banka Kartı', description: 'Debit kartlar', active: true },
    { id: 3, name: 'Havale/EFT', description: 'Banka havalesi', active: true },
    { id: 4, name: 'Kapıda Ödeme', description: 'Nakit ödeme', active: true },
    { id: 5, name: 'Taksit', description: '2-12 ay taksit', active: true }
  ]);

  const tabs = [
    { id: 'kategoriler', name: 'Kategoriler', icon: Tag, data: kategoriler, setData: setKategoriler },
    { id: 'bedenler', name: 'Bedenler', icon: Ruler, data: bedenler, setData: setBedenler },
    { id: 'renkler', name: 'Renkler', icon: PaletteIcon, data: renkler, setData: setRenkler },
    { id: 'markalar', name: 'Markalar', icon: Package, data: markalar, setData: setMarkalar },
    { id: 'kargolar', name: 'Kargo', icon: Truck, data: kargolar, setData: setKargolar },
    { id: 'odemeler', name: 'Ödeme', icon: CreditCard, data: odemeler, setData: setOdemeler }
  ];

  const getCurrentData = () => {
    const currentTab = tabs.find(tab => tab.id === activeTab);
    return currentTab ? currentTab.data : [];
  };

  const getCurrentSetData = () => {
    const currentTab = tabs.find(tab => tab.id === activeTab);
    return currentTab ? currentTab.setData : () => {};
  };

  const handleAdd = () => {
    if (!newItem.name.trim()) return;
    
    const currentData = getCurrentData();
    const setCurrentData = getCurrentSetData();
    const newId = Math.max(...currentData.map(item => item.id), 0) + 1;
    
    const itemToAdd = {
      id: newId,
      name: newItem.name,
      description: newItem.description,
      active: true,
      ...(activeTab === 'kategoriler' && { parentId: null, subcategories: [] }),
      ...(activeTab === 'renkler' && { color: newItem.color }),
      ...(activeTab === 'bedenler' && { category: 'Giyim' }),
      ...(activeTab === 'kargolar' && { price: 15 })
    };
    
    setCurrentData([...currentData, itemToAdd]);
    setNewItem({ name: '', description: '', color: '#3B82F6' });
    setShowAddModal(false);
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item });
  };

  const handleSaveEdit = () => {
    if (!editingItem.name.trim()) return;
    
    const currentData = getCurrentData();
    const setCurrentData = getCurrentSetData();
    
    const updatedData = currentData.map(item => 
      item.id === editingItem.id ? editingItem : item
    );
    
    setCurrentData(updatedData);
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    if (confirm('Bu öğeyi silmek istediğinizden emin misiniz?')) {
      const currentData = getCurrentData();
      const setCurrentData = getCurrentSetData();
      
      const updatedData = currentData.filter(item => item.id !== id);
      setCurrentData(updatedData);
    }
  };

  const toggleActive = (id) => {
    const currentData = getCurrentData();
    const setCurrentData = getCurrentSetData();
    
    const updatedData = currentData.map(item => 
      item.id === id ? { ...item, active: !item.active } : item
    );
    
    setCurrentData(updatedData);
  };

  const handleManageSubcategories = (category) => {
    setSelectedCategory(category);
    setShowSubcategoryModal(true);
  };

  const handleAddSubcategory = () => {
    if (!newSubcategory.name.trim() || !selectedCategory) return;
    
    const newId = Math.max(...kategoriler.flatMap(cat => cat.subcategories?.map(sub => sub.id) || []), 0) + 1;
    const subcategoryToAdd = {
      id: newId,
      name: newSubcategory.name,
      description: newSubcategory.description,
      active: true,
      parentId: selectedCategory.id
    };
    
    const updatedKategoriler = kategoriler.map(cat => 
      cat.id === selectedCategory.id 
        ? { ...cat, subcategories: [...(cat.subcategories || []), subcategoryToAdd] }
        : cat
    );
    
    setKategoriler(updatedKategoriler);
    setNewSubcategory({ name: '', description: '' });
  };

  const handleDeleteSubcategory = (subcategoryId) => {
    if (!confirm('Bu alt kategoriyi silmek istediğinizden emin misiniz?')) return;
    
    const updatedKategoriler = kategoriler.map(cat => 
      cat.id === selectedCategory.id 
        ? { ...cat, subcategories: cat.subcategories?.filter(sub => sub.id !== subcategoryId) || [] }
        : cat
    );
    
    setKategoriler(updatedKategoriler);
  };

  const toggleSubcategoryActive = (subcategoryId) => {
    const updatedKategoriler = kategoriler.map(cat => 
      cat.id === selectedCategory.id 
        ? { 
            ...cat, 
            subcategories: cat.subcategories?.map(sub => 
              sub.id === subcategoryId ? { ...sub, active: !sub.active } : sub
            ) || []
          }
        : cat
    );
    
    setKategoriler(updatedKategoriler);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/admin" className="flex items-center text-white hover:text-teal-200 mr-6">
                <ArrowLeft size={20} className="mr-2" />
                Geri Dön
              </Link>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-bold text-white">Altıntassoft</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Settings className="w-10 h-10 text-teal-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Sistem Tanımlamaları
          </h1>
          <p className="text-gray-600 text-lg">
            Kategoriler, bedenler, renkler ve diğer sistem ayarları
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon size={16} />
                  <span>{tab.name}</span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {getCurrentData().length}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {tabs.find(tab => tab.id === activeTab)?.name} Yönetimi
              </h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Yeni Ekle</span>
              </button>
            </div>

            {/* Items List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getCurrentData().map((item) => (
                <div key={item.id} className={`border rounded-lg p-4 ${item.active ? 'bg-white' : 'bg-gray-50'} ${activeTab === 'kategoriler' && item.subcategories ? 'border-l-4 border-l-teal-500' : ''}`}>
                  {editingItem && editingItem.id === item.id ? (
                    // Edit Mode
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                      />
                      <textarea
                        value={editingItem.description}
                        onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                        rows={2}
                      />
                      {activeTab === 'renkler' && (
                        <input
                          type="color"
                          value={editingItem.color}
                          onChange={(e) => setEditingItem({...editingItem, color: e.target.value})}
                          className="w-full h-10 border border-gray-300 rounded-md"
                        />
                      )}
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveEdit}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 flex items-center space-x-1"
                        >
                          <Save size={14} />
                          <span>Kaydet</span>
                        </button>
                        <button
                          onClick={() => setEditingItem(null)}
                          className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 flex items-center space-x-1"
                        >
                          <X size={14} />
                          <span>İptal</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900 flex items-center space-x-2">
                          {activeTab === 'renkler' && (
                            <div 
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: item.color }}
                            />
                          )}
                          <span>{item.name}</span>
                        </h3>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => toggleActive(item.id)}
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              item.active 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {item.active ? 'Aktif' : 'Pasif'}
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      {activeTab === 'bedenler' && item.category && (
                        <p className="text-xs text-gray-500 mb-3">Kategori: {item.category}</p>
                      )}
                      {activeTab === 'kargolar' && item.price && (
                        <p className="text-xs text-gray-500 mb-3">Fiyat: {item.price} TL</p>
                      )}
                      {activeTab === 'kategoriler' && item.subcategories && (
                        <div className="mb-3">
                          <p className="text-xs text-gray-500 mb-2">Alt Kategoriler ({item.subcategories.length}):</p>
                          <div className="flex flex-wrap gap-1">
                            {item.subcategories.slice(0, 3).map((sub) => (
                              <span key={sub.id} className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                                {sub.name}
                              </span>
                            ))}
                            {item.subcategories.length > 3 && (
                              <span className="text-xs text-gray-500">+{item.subcategories.length - 3} daha</span>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center space-x-1"
                        >
                          <Edit size={14} />
                          <span>Düzenle</span>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 flex items-center space-x-1"
                        >
                          <Trash2 size={14} />
                          <span>Sil</span>
                        </button>
                        {activeTab === 'kategoriler' && item.subcategories && (
                          <button 
                            onClick={() => handleManageSubcategories(item)}
                            className="bg-teal-600 text-white px-3 py-1 rounded text-sm hover:bg-teal-700 flex items-center space-x-1"
                          >
                            <Tag size={14} />
                            <span>Alt Kat.</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Development Info */}
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
          <h3 className="font-semibold text-teal-800 mb-2">Geliştirme Durumu:</h3>
          <div className="text-sm text-teal-700 space-y-2">
            <p>✅ Temel CRUD işlemleri (Ekleme, Düzenleme, Silme)</p>
            <p>✅ Aktif/Pasif durumu yönetimi</p>
            <p>✅ 6 farklı tanımlama kategorisi</p>
            <p>✅ Hiyerarşik kategori yapısı (Ana/Alt kategoriler)</p>
            <p>✅ Alt kategori görüntüleme ve sayaçları</p>
            <p>🔄 Database entegrasyonu yapılacak</p>
            <p>🔄 Alt kategori yönetim modalı</p>
            <p>🔄 Toplu işlemler eklenecek</p>
            <p>🔄 İçe/Dışa aktarma özelliği</p>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Yeni {tabs.find(tab => tab.id === activeTab)?.name} Ekle
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                  placeholder="Ad girin"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                  rows={3}
                  placeholder="Açıklama girin"
                />
              </div>
              
              {activeTab === 'renkler' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Renk</label>
                  <input
                    type="color"
                    value={newItem.color}
                    onChange={(e) => setNewItem({...newItem, color: e.target.value})}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
              )}
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleAdd}
                className="flex-1 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors"
              >
                Ekle
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subcategory Management Modal */}
      {showSubcategoryModal && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold">
                {selectedCategory.name} - Alt Kategoriler
              </h3>
              <button
                onClick={() => {
                  setShowSubcategoryModal(false);
                  setSelectedCategory(null);
                  setNewSubcategory({ name: '', description: '' });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 max-h-96 overflow-y-auto">
              {/* Add New Subcategory */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-4">Yeni Alt Kategori Ekle</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                    <input
                      type="text"
                      value={newSubcategory.name}
                      onChange={(e) => setNewSubcategory({...newSubcategory, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                      placeholder="Alt kategori adı"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                    <input
                      type="text"
                      value={newSubcategory.description}
                      onChange={(e) => setNewSubcategory({...newSubcategory, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
                      placeholder="Açıklama"
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddSubcategory}
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors flex items-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Alt Kategori Ekle</span>
                </button>
              </div>

              {/* Existing Subcategories */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">
                  Mevcut Alt Kategoriler ({selectedCategory.subcategories?.length || 0})
                </h4>
                {selectedCategory.subcategories && selectedCategory.subcategories.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCategory.subcategories.map((subcategory) => (
                      <div key={subcategory.id} className={`border rounded-lg p-4 ${subcategory.active ? 'bg-white' : 'bg-gray-50'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{subcategory.name}</h5>
                          <button
                            onClick={() => toggleSubcategoryActive(subcategory.id)}
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              subcategory.active 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {subcategory.active ? 'Aktif' : 'Pasif'}
                          </button>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{subcategory.description}</p>
                        <div className="flex space-x-2">
                          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center space-x-1">
                            <Edit size={12} />
                            <span>Düzenle</span>
                          </button>
                          <button 
                            onClick={() => handleDeleteSubcategory(subcategory.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 flex items-center space-x-1"
                          >
                            <Trash2 size={12} />
                            <span>Sil</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Tag size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>Henüz alt kategori eklenmemiş</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => {
                  setShowSubcategoryModal(false);
                  setSelectedCategory(null);
                  setNewSubcategory({ name: '', description: '' });
                }}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SistemTanimlamalari;