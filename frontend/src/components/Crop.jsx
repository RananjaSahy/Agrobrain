import { useState } from "react";
//api_8fc31148-9354-46f1-a147-82c186bd6fce
import axios from "axios";
import { ArrowLeft, Crop } from "react-feather";
const states = [
 "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir ", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana ", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];
  
  const dist = [
   "NICOBARS", "NORTH AND MIDDLE ANDAMAN", "SOUTH ANDAMANS", "ANANTAPUR", "CHITTOOR", "EAST GODAVARI", "GUNTUR", "KADAPA", "KRISHNA", "KURNOOL", "PRAKASAM", "SPSR NELLORE", "SRIKAKULAM", "VISAKHAPATANAM", "VIZIANAGARAM", "WEST GODAVARI", "ANJAW", "CHANGLANG", "DIBANG VALLEY", "EAST KAMENG", "EAST SIANG", "KURUNG KUMEY", "LOHIT", "LONGDING", "LOWER SUBANSIRI", "PAPUM PARE", "TAWANG", "TIRAP", "UPPER SIANG", "UPPER SUBANSIRI", "WEST KAMENG", "WEST SIANG", "BAKSA", "BARPETA", "BONGAIGAON", "CACHAR", "CHIRANG", "DARRANG", "DHEMAJI", "DHUBRI", "DIBRUGARH", "DIMA HASAO", "GOALPARA", "GOLAGHAT", "HAILAKANDI", "JORHAT", "KAMRUP", "KAMRUP METRO", "KARBI ANGLONG", "KARIMGANJ", "KOKRAJHAR", "LAKHIMPUR", "MARIGAON", "NAGAON", "NALBARI", "SIVASAGAR", "SONITPUR", "TINSUKIA", "UDALGURI", "ARARIA", "ARWAL", "AURANGABAD", "BANKA", "BEGUSARAI", "BHAGALPUR", "BHOJPUR", "BUXAR", "DARBHANGA", "GAYA", "GOPALGANJ", "JAMUI", "JEHANABAD", "KAIMUR (BHABUA)", "KATIHAR", "KHAGARIA", "KISHANGANJ", "LAKHISARAI", "MADHEPURA", "MADHUBANI", "MUNGER", "MUZAFFARPUR", "NALANDA", "NAWADA", "PASHCHIM CHAMPARAN", "PATNA", "PURBI CHAMPARAN", "PURNIA", "ROHTAS", "SAHARSA", "SAMASTIPUR", "SARAN", "SHEIKHPURA", "SHEOHAR", "SITAMARHI", "SIWAN", "SUPAUL", "VAISHALI", "CHANDIGARH", "BALOD", "BALODA BAZAR", "BALRAMPUR", "BASTAR", "BEMETARA", "BIJAPUR", "BILASPUR", "DANTEWADA", "DHAMTARI", "DURG", "GARIYABAND", "JANJGIR-CHAMPA", "JASHPUR", "KABIRDHAM", "KANKER", "KONDAGAON", "KORBA", "KOREA", "MAHASAMUND", "MUNGELI", "NARAYANPUR", "RAIGARH", "RAIPUR", "RAJNANDGAON", "SUKMA", "SURAJPUR", "SURGUJA", "DADRA AND NAGAR HAVELI", "NORTH GOA", "SOUTH GOA", "AHMADABAD", "AMRELI", "ANAND", "BANAS KANTHA", "BHARUCH", "BHAVNAGAR", "DANG", "DOHAD", "GANDHINAGAR", "JAMNAGAR", "JUNAGADH", "KACHCHH", "KHEDA", "MAHESANA", "NARMADA", "NAVSARI", "PANCH MAHALS", "PATAN", "PORBANDAR", "RAJKOT", "SABAR KANTHA", "SURAT", "SURENDRANAGAR", "TAPI", "VADODARA", "VALSAD", "AMBALA", "BHIWANI", "FARIDABAD", "FATEHABAD", "GURGAON", "HISAR", "JHAJJAR", "JIND", "KAITHAL", "KARNAL", "KURUKSHETRA", "MAHENDRAGARH", "MEWAT", "PALWAL", "PANCHKULA", "PANIPAT", "REWARI", "ROHTAK", "SIRSA", "SONIPAT", "YAMUNANAGAR", "CHAMBA", "HAMIRPUR", "KANGRA", "KINNAUR", "KULLU", "LAHUL AND SPITI", "MANDI", "SHIMLA", "SIRMAUR", "SOLAN", "UNA", "ANANTNAG", "BADGAM", "BANDIPORA", "BARAMULLA", "DODA", "GANDERBAL", "JAMMU", "KATHUA", "KISHTWAR", "KULGAM", "POONCH", "PULWAMA", "RAJAURI", "REASI", "SAMBA", "SHOPIAN", "SRINAGAR", "UDHAMPUR", "CHATRA", "DEOGHAR", "DHANBAD", "DUMKA", "EAST SINGHBUM", "GARHWA", "GODDA", "GUMLA", "HAZARIBAGH", "JAMTARA", "LATEHAR", "LOHARDAGA", "PAKUR", "RAMGARH", "RANCHI", "SAHEBGANJ", "SARAIKELA KHARSAWAN", "SIMDEGA", "BAGALKOT", "BANGALORE RURAL", "BELGAUM", "BELLARY", "BENGALURU URBAN", "BIDAR", "CHAMARAJANAGAR", "CHIKBALLAPUR", "CHIKMAGALUR", "CHITRADURGA", "DAKSHIN KANNAD", "DAVANGERE", "DHARWAD", "GADAG", "GULBARGA", "HASSAN", "HAVERI", "KODAGU", "KOLAR", "KOPPAL", "MANDYA", "MYSORE", "RAICHUR", "RAMANAGARA", "SHIMOGA", "TUMKUR", "UDUPI", "UTTAR KANNAD", "YADGIR", "ALAPPUZHA", "ERNAKULAM", "IDUKKI", "KANNUR", "KASARAGOD", "KOLLAM", "KOTTAYAM", "KOZHIKODE", "MALAPPURAM", "PALAKKAD", "PATHANAMTHITTA", "THIRUVANANTHAPURAM", "THRISSUR", "WAYANAD", "ALIRAJPUR", "ANUPPUR", "ASHOKNAGAR", "BALAGHAT", "BARWANI", "BETUL", "BHIND", "BHOPAL", "BURHANPUR", "CHHATARPUR", "CHHINDWARA", "DAMOH", "DATIA", "DEWAS", "DHAR", "DINDORI", "GUNA", "GWALIOR", "HARDA", "HOSHANGABAD", "INDORE", "JABALPUR", "JHABUA", "KATNI", "KHANDWA", "KHARGONE", "MANDLA", "MANDSAUR", "MORENA", "NARSINGHPUR", "NEEMUCH", "PANNA", "RAISEN", "RAJGARH", "RATLAM", "REWA", "SAGAR", "SATNA", "SEHORE", "SEONI", "SHAHDOL", "SHAJAPUR", "SHEOPUR", "SHIVPURI", "SIDHI", "SINGRAULI", "TIKAMGARH", "UJJAIN", "UMARIA", "VIDISHA", "AHMEDNAGAR", "AKOLA", "AMRAVATI", "BEED", "BHANDARA", "BULDHANA", "CHANDRAPUR", "DHULE", "GADCHIROLI", "GONDIA", "HINGOLI", "JALGAON", "JALNA", "KOLHAPUR", "LATUR", "NAGPUR", "NANDED", "NANDURBAR", "NASHIK", "OSMANABAD", "PALGHAR", "PARBHANI", "PUNE", "RAIGAD", "RATNAGIRI", "SANGLI", "SATARA", "SINDHUDURG", "SOLAPUR", "THANE", "WARDHA", "WASHIM", "YAVATMAL", "BISHNUPUR", "CHANDEL", "CHURACHANDPUR", "IMPHAL EAST", "IMPHAL WEST", "SENAPATI", "TAMENGLONG", "THOUBAL", "UKHRUL", "EAST GARO HILLS", "EAST JAINTIA HILLS", "EAST KHASI HILLS", "NORTH GARO HILLS", "RI BHOI", "SOUTH GARO HILLS", "SOUTH WEST GARO HILLS", "SOUTH WEST KHASI HILLS", "WEST GARO HILLS", "WEST JAINTIA HILLS", "WEST KHASI HILLS", "AIZAWL", "CHAMPHAI", "KOLASIB", "LAWNGTLAI", "LUNGLEI", "MAMIT", "SAIHA", "SERCHHIP", "DIMAPUR", "KIPHIRE", "KOHIMA", "LONGLENG", "MOKOKCHUNG", "MON", "PEREN", "PHEK", "TUENSANG", "WOKHA", "ZUNHEBOTO", "ANUGUL", "BALANGIR", "BALESHWAR", "BARGARH", "BHADRAK", "BOUDH", "CUTTACK", "DEOGARH", "DHENKANAL", "GAJAPATI", "GANJAM", "JAGATSINGHAPUR", "JAJAPUR", "JHARSUGUDA", "KALAHANDI", "KANDHAMAL", "KENDRAPARA", "KENDUJHAR", "KHORDHA", "KORAPUT", "MALKANGIRI", "MAYURBHANJ", "NABARANGPUR", "NAYAGARH", "NUAPADA", "PURI", "RAYAGADA", "SAMBALPUR", "SONEPUR", "SUNDARGARH", "KARAIKAL", "MAHE", "PONDICHERRY", "YANAM", "AMRITSAR", "BARNALA", "BATHINDA", "FARIDKOT", "FATEHGARH SAHIB", "FAZILKA", "FIROZEPUR", "GURDASPUR", "HOSHIARPUR", "JALANDHAR", "KAPURTHALA", "LUDHIANA", "MANSA", "MOGA", "MUKTSAR", "NAWANSHAHR", "PATHANKOT", "PATIALA", "RUPNAGAR", "S.A.S NAGAR", "SANGRUR", "TARN TARAN", "AJMER", "ALWAR", "BANSWARA", "BARAN", "BARMER", "BHARATPUR", "BHILWARA", "BIKANER", "BUNDI", "CHITTORGARH", "CHURU", "DAUSA", "DHOLPUR", "DUNGARPUR", "GANGANAGAR", "HANUMANGARH", "JAIPUR", "JAISALMER", "JALORE", "JHALAWAR", "JHUNJHUNU", "JODHPUR", "KARAULI", "KOTA", "NAGAUR", "PALI", "PRATAPGARH", "RAJSAMAND", "SAWAI MADHOPUR", "SIKAR", "SIROHI", "TONK", "UDAIPUR", "EAST DISTRICT", "NORTH DISTRICT", "SOUTH DISTRICT", "WEST DISTRICT", "ARIYALUR", "COIMBATORE", "CUDDALORE", "DHARMAPURI", "DINDIGUL", "ERODE", "KANCHIPURAM", "KANNIYAKUMARI", "KARUR", "KRISHNAGIRI", "MADURAI", "NAGAPATTINAM", "NAMAKKAL", "PERAMBALUR", "PUDUKKOTTAI", "RAMANATHAPURAM", "SALEM", "SIVAGANGA", "THANJAVUR", "THE NILGIRIS", "THENI", "THIRUVALLUR", "THIRUVARUR", "TIRUCHIRAPPALLI", "TIRUNELVELI", "TIRUPPUR", "TIRUVANNAMALAI", "TUTICORIN", "VELLORE", "VILLUPURAM", "VIRUDHUNAGAR", "ADILABAD", "HYDERABAD", "KARIMNAGAR", "KHAMMAM", "MAHBUBNAGAR", "MEDAK", "NALGONDA", "NIZAMABAD", "RANGAREDDI", "WARANGAL", "DHALAI", "GOMATI", "KHOWAI", "NORTH TRIPURA", "SEPAHIJALA", "SOUTH TRIPURA", "UNAKOTI", "WEST TRIPURA", "AGRA", "ALIGARH", "ALLAHABAD", "AMBEDKAR NAGAR", "AMETHI", "AMROHA", "AURAIYA", "AZAMGARH", "BAGHPAT", "BAHRAICH", "BALLIA", "BANDA", "BARABANKI", "BAREILLY", "BASTI", "BIJNOR", "BUDAUN", "BULANDSHAHR", "CHANDAULI", "CHITRAKOOT", "DEORIA", "ETAH", "ETAWAH", "FAIZABAD", "FARRUKHABAD", "FATEHPUR", "FIROZABAD", "GAUTAM BUDDHA NAGAR", "GHAZIABAD", "GHAZIPUR", "GONDA", "GORAKHPUR", "HAPUR", "HARDOI", "HATHRAS", "JALAUN", "JAUNPUR", "JHANSI", "KANNAUJ", "KANPUR DEHAT", "KANPUR NAGAR", "KASGANJ", "KAUSHAMBI", "KHERI", "KUSHI NAGAR", "LALITPUR", "LUCKNOW", "MAHARAJGANJ", "MAHOBA", "MAINPURI", "MATHURA", "MAU", "MEERUT", "MIRZAPUR", "MORADABAD", "MUZAFFARNAGAR", "PILIBHIT", "RAE BARELI", "RAMPUR", "SAHARANPUR", "SAMBHAL", "SANT KABEER NAGAR", "SANT RAVIDAS NAGAR", "SHAHJAHANPUR", "SHAMLI", "SHRAVASTI", "SIDDHARTH NAGAR", "SITAPUR", "SONBHADRA", "SULTANPUR", "UNNAO", "VARANASI", "ALMORA", "BAGESHWAR", "CHAMOLI", "CHAMPAWAT", "DEHRADUN", "HARIDWAR", "NAINITAL", "PAURI GARHWAL", "PITHORAGARH", "RUDRA PRAYAG", "TEHRI GARHWAL", "UDAM SINGH NAGAR", "UTTAR KASHI", "24 PARAGANAS NORTH", "24 PARAGANAS SOUTH", "BANKURA", "BARDHAMAN", "BIRBHUM", "COOCHBEHAR", "DARJEELING", "DINAJPUR DAKSHIN", "DINAJPUR UTTAR", "HOOGHLY", "HOWRAH", "JALPAIGURI", "MALDAH", "MEDINIPUR EAST", "MEDINIPUR WEST", "MURSHIDABAD", "NADIA", "PURULIA"
  ];
  
  const seasons = ["Kharif     ", "Whole Year ", "Autumn     ", "Rabi       ", "Summer     ", "Winter     "];
const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    state: "Odisha",
    district: "Cuttack",
    season: "Kharif",
    area: 2.5,
    N: 90,
    P: 40,
    K: 30,
    temperature: 25,
    humidity: 70,
    ph: 6.5,
    rainfall: 200,
  });

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const cropImages = {
    rice: "https://example.com/rice.jpg",
    jute: "https://example.com/jute.jpg",
    coffee: "https://example.com/coffee.jpg",
    maize: "https://example.com/maize.jpg",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://sujoy0011-crop-recommendation.hf.space/predict",
        formData
      );
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
    setLoading(false);
  };

    return (
       <>
            <nav className="bg-green-100 shadow-md w-full flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Crop className="text-green-700 w-8 h-8" />
          <h1 className="text-2xl font-bold text-green-700">Crop Recommendation</h1>
        </div>
        <button
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Go Back</span>
        </button>
                </nav>
                <div className="flex flex-row items-start justify-center min-h-screen bg-gray-300 px-6 gap-10">
  {/* Form */}
  <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow-md rounded-md w-1/3 mt-10">
      <label className="block">
        State:
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        District:
        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          disabled={!formData.state}
        >
          <option value="">Select District</option>
          {dist.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        Season:
        <select
          name="season"
          value={formData.season}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Season</option>
          {seasons.map((season) => (
            <option key={season} value={season}>
              {season}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="bg-green-600 text-white py-2 px-4 rounded-md w-full hover:bg-green-700"
      >
        {loading ? "Loading..." : "Get Recommendation"}
      </button>
    </form>

  {/* Display Recommendations */}

  {recommendations.length > 0 && (
  <div className="w-2/3 p-4  rounded-md mt-10">
    <h3 className="text-xl font-semibold mb-3">Recommended Crops:</h3>
    <div className="grid grid-cols-2 gap-4">
      {recommendations.map((crop) => {
        const cropImageUrl = `https://api.crop.photo/crop?url=https://source.unsplash.com/200x200/?${crop}&width=200&height=200&api_key=api_8fc31148-9354-46f1-a147-82c186bd6fce`;

        return (
          <div key={crop} className="border p-3 rounded-md shadow-md text-center">
            <img
              src={cropImageUrl}
              alt={crop}
              className="w-full h-32 object-cover rounded-md"
            />
            <p className="text-lg font-bold mt-2 capitalize">{crop}</p>
          </div>
        );
      })}
    </div>
  </div>
)}

</div>

            </>
  );
};

export default CropRecommendation;
