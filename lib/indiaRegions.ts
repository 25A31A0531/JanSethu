export interface StateInfo {
  code: string;
  name: string;
  type: 'STATE' | 'UT';
  majorLanguages: string[];
  officialPortalUrl: string;
  districts: string[];
}

export const INDIA_STATES_AND_UTS: StateInfo[] = [
  { code: 'AP', name: 'Andhra Pradesh', type: 'STATE', majorLanguages: ['Telugu', 'English', 'Urdu'], officialPortalUrl: 'https://ap.gov.in', districts: ['Ananthapuramu', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa', 'Kakinada', 'Konaseema', 'Eluru', 'NTR', 'Bapatla', 'Palnadu', 'Nandyal', 'Sri Sathya Sai', 'Annamayya', 'Tirupati', 'Alluri Sitharama Raju', 'Parvathipuram Manyam', 'Anakapalli'] },
  { code: 'TG', name: 'Telangana', type: 'STATE', majorLanguages: ['Telugu', 'Urdu', 'English'], officialPortalUrl: 'https://telangana.gov.in', districts: ['Adilabad', 'Bhadradri Kothagudem', 'Hyderabad', 'Jagtial', 'Jangaon', 'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam', 'Komaram Bheem Asifabad', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak', 'Medchal Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Ranga Reddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal', 'Hanamkonda', 'Yadadri Bhuvanagiri'] },
  { code: 'TN', name: 'Tamil Nadu', type: 'STATE', majorLanguages: ['Tamil', 'English'], officialPortalUrl: 'https://tn.gov.in', districts: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Tiruppur', 'Vellore', 'Erode', 'Thoothukudi', 'Dindigul', 'Thanjavur', 'Ranipet', 'Virudhunagar', 'Karur', 'Nilgiris', 'Kanchipuram'] },
  { code: 'KA', name: 'Karnataka', type: 'STATE', majorLanguages: ['Kannada', 'English'], officialPortalUrl: 'https://karnataka.gov.in', districts: ['Bengaluru Urban', 'Bengaluru Rural', 'Mysuru', 'Belagavi', 'Ballari', 'Dakshina Kannada', 'Dharwad', 'Kalaburagi', 'Tumakuru', 'Shivamogga', 'Udupi', 'Hassan', 'Vijayapura'] },
  { code: 'KL', name: 'Kerala', type: 'STATE', majorLanguages: ['Malayalam', 'English'], officialPortalUrl: 'https://kerala.gov.in', districts: ['Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam', 'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod'] },
  { code: 'MH', name: 'Maharashtra', type: 'STATE', majorLanguages: ['Marathi', 'Hindi', 'English'], officialPortalUrl: 'https://maharashtra.gov.in', districts: ['Mumbai City', 'Mumbai Suburban', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Amravati', 'Kolhapur', 'Nanded', 'Sangli', 'Jalgaon'] },
  { code: 'DL', name: 'Delhi', type: 'UT', majorLanguages: ['Hindi', 'English', 'Punjabi', 'Urdu'], officialPortalUrl: 'https://delhi.gov.in', districts: ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi'] },
  { code: 'UP', name: 'Uttar Pradesh', type: 'STATE', majorLanguages: ['Hindi', 'Urdu'], officialPortalUrl: 'https://up.gov.in', districts: ['Lucknow', 'Kanpur Nagar', 'Varanasi', 'Prayagraj', 'Agra', 'Meerut', 'Noida (Gautam Buddha Nagar)', 'Ghaziabad', 'Gorakhpur', 'Bareilly', 'Aligarh', 'Moradabad'] },
  { code: 'WB', name: 'West Bengal', type: 'STATE', majorLanguages: ['Bengali', 'English', 'Hindi'], officialPortalUrl: 'https://wb.gov.in', districts: ['Kolkata', 'North 24 Parganas', 'South 24 Parganas', 'Howrah', 'Hooghly', 'Darjeeling', 'Paschim Bardhaman', 'Purba Bardhaman', 'Murshidabad', 'Nadia'] },
  { code: 'GJ', name: 'Gujarat', type: 'STATE', majorLanguages: ['Gujarati', 'Hindi'], officialPortalUrl: 'https://gujaratindia.gov.in', districts: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar', 'Junagadh', 'Kutch', 'Mehsana'] },
  { code: 'RJ', name: 'Rajasthan', type: 'STATE', majorLanguages: ['Hindi', 'Rajasthani'], officialPortalUrl: 'https://rajasthan.gov.in', districts: ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur', 'Bhilwara', 'Alwar', 'Bharatpur', 'Sikar'] },
  { code: 'MP', name: 'Madhya Pradesh', type: 'STATE', majorLanguages: ['Hindi'], officialPortalUrl: 'https://mp.gov.in', districts: ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Rewa', 'Satna', 'Ratlam'] },
  { code: 'PB', name: 'Punjab', type: 'STATE', majorLanguages: ['Punjabi', 'Hindi', 'English'], officialPortalUrl: 'https://punjab.gov.in', districts: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali (SAS Nagar)', 'Hoshiarpur', 'Pathankot'] },
  { code: 'HR', name: 'Haryana', type: 'STATE', majorLanguages: ['Hindi', 'Punjabi'], officialPortalUrl: 'https://haryana.gov.in', districts: ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak', 'Hisar', 'Karnal', 'Sonipat', 'Panchkula'] },
  { code: 'BR', name: 'Bihar', type: 'STATE', majorLanguages: ['Hindi', 'Maithili', 'Bhojpuri', 'Urdu'], officialPortalUrl: 'https://bihar.gov.in', districts: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Bihar Sharif', 'Arrah', 'Begusarai'] },
  { code: 'OD', name: 'Odisha', type: 'STATE', majorLanguages: ['Odia', 'English'], officialPortalUrl: 'https://odisha.gov.in', districts: ['Khordha (Bhubaneswar)', 'Cuttack', 'Ganjam', 'Sundargarh (Rourkela)', 'Puri', 'Balasore', 'Sambalpur'] },
  { code: 'AS', name: 'Assam', type: 'STATE', majorLanguages: ['Assamese', 'Bengali', 'Bodo', 'English'], officialPortalUrl: 'https://assam.gov.in', districts: ['Kamrup Metropolitan (Guwahati)', 'Dibrugarh', 'Silchar (Cachar)', 'Jorhat', 'Nagaon', 'Tinsukia'] },
  { code: 'JH', name: 'Jharkhand', type: 'STATE', majorLanguages: ['Hindi', 'Santali', 'Bengali'], officialPortalUrl: 'https://jharkhand.gov.in', districts: ['Ranchi', 'East Singhbhum (Jamshedpur)', 'Dhanbad', 'Bokaro', 'Hazaribagh', 'Deoghar'] },
  { code: 'CG', name: 'Chhattisgarh', type: 'STATE', majorLanguages: ['Hindi', 'Chhattisgarhi'], officialPortalUrl: 'https://cgstate.gov.in', districts: ['Raipur', 'Durg (Bhilai)', 'Bilaspur', 'Korba', 'Rajnandgaon', 'Jagdalpur'] },
  { code: 'UT', name: 'Uttarakhand', type: 'STATE', majorLanguages: ['Hindi', 'Garhwali', 'Kumaoni'], officialPortalUrl: 'https://uk.gov.in', districts: ['Dehradun', 'Haridwar', 'Nainital', 'Udham Singh Nagar', 'Pauri Garhwal', 'Almora'] },
  { code: 'HP', name: 'Himachal Pradesh', type: 'STATE', majorLanguages: ['Hindi'], officialPortalUrl: 'https://himachal.nic.in', districts: ['Shimla', 'Kangra (Dharamshala)', 'Mandi', 'Solan', 'Kullu', 'Sirmaur', 'Hamirpur'] },
  { code: 'GA', name: 'Goa', type: 'STATE', majorLanguages: ['Konkani', 'Marathi', 'English'], officialPortalUrl: 'https://goa.gov.in', districts: ['North Goa', 'South Goa'] },
  { code: 'TR', name: 'Tripura', type: 'STATE', majorLanguages: ['Bengali', 'Kokborok', 'English'], officialPortalUrl: 'https://tripura.gov.in', districts: ['West Tripura (Agartala)', 'South Tripura', 'Gomati', 'North Tripura'] },
  { code: 'ML', name: 'Meghalaya', type: 'STATE', majorLanguages: ['English', 'Khasi', 'Garo'], officialPortalUrl: 'https://meghalaya.gov.in', districts: ['East Khasi Hills (Shillong)', 'West Garo Hills', 'Ri-Bhoi'] },
  { code: 'MN', name: 'Manipur', type: 'STATE', majorLanguages: ['Manipuri (Meitei)', 'English'], officialPortalUrl: 'https://manipur.gov.in', districts: ['Imphal East', 'Imphal West', 'Thoubal', 'Churachandpur'] },
  { code: 'NL', name: 'Nagaland', type: 'STATE', majorLanguages: ['English'], officialPortalUrl: 'https://nagaland.gov.in', districts: ['Kohima', 'Dimapur', 'Mokokchung', 'Mon'] },
  { code: 'MZ', name: 'Mizoram', type: 'STATE', majorLanguages: ['Mizo', 'English'], officialPortalUrl: 'https://mizoram.gov.in', districts: ['Aizawl', 'Lunglei', 'Champhai'] },
  { code: 'SK', name: 'Sikkim', type: 'STATE', majorLanguages: ['Nepali', 'English', 'Sikkimese'], officialPortalUrl: 'https://sikkim.gov.in', districts: ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan'] },
  { code: 'AR', name: 'Arunachal Pradesh', type: 'STATE', majorLanguages: ['English', 'Hindi'], officialPortalUrl: 'https://arunachalpradesh.gov.in', districts: ['Papum Pare (Itanagar)', 'Changlang', 'West Kameng', 'Tawang'] },
  { code: 'JK', name: 'Jammu and Kashmir', type: 'UT', majorLanguages: ['Kashmiri', 'Dogri', 'Urdu', 'Hindi', 'English'], officialPortalUrl: 'https://jk.gov.in', districts: ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Kathua', 'Udhampur'] },
  { code: 'LA', name: 'Ladakh', type: 'UT', majorLanguages: ['Ladakhi', 'Tibetan', 'Hindi', 'English'], officialPortalUrl: 'https://ladakh.nic.in', districts: ['Leh', 'Kargil'] },
  { code: 'CH', name: 'Chandigarh', type: 'UT', majorLanguages: ['Punjabi', 'Hindi', 'English'], officialPortalUrl: 'https://chandigarh.gov.in', districts: ['Chandigarh'] },
  { code: 'PY', name: 'Puducherry', type: 'UT', majorLanguages: ['Tamil', 'French', 'English'], officialPortalUrl: 'https://py.gov.in', districts: ['Puducherry', 'Karaikal', 'Mahe', 'Yanam'] },
  { code: 'AN', name: 'Andaman and Nicobar Islands', type: 'UT', majorLanguages: ['Hindi', 'Bengali', 'Tamil', 'English'], officialPortalUrl: 'https://andaman.gov.in', districts: ['South Andaman (Port Blair)', 'North and Middle Andaman', 'Nicobar'] },
  { code: 'DNHDD', name: 'Dadra and Nagar Haveli and Daman and Diu', type: 'UT', majorLanguages: ['Gujarati', 'Hindi', 'Marathi'], officialPortalUrl: 'https://daman.nic.in', districts: ['Daman', 'Diu', 'Dadra and Nagar Haveli'] },
  { code: 'LD', name: 'Lakshadweep', type: 'UT', majorLanguages: ['Malayalam', 'English'], officialPortalUrl: 'https://lakshadweep.gov.in', districts: ['Kavaratti'] },
];

export function getStateByName(name: string): StateInfo | undefined {
  if (!name) return undefined;
  const clean = name.trim().toLowerCase();
  return INDIA_STATES_AND_UTS.find((s) => s.name.toLowerCase() === clean || s.code.toLowerCase() === clean);
}

export function getAllStateNames(): string[] {
  return INDIA_STATES_AND_UTS.map((s) => s.name);
}
