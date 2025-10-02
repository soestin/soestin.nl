import { NextRequest, NextResponse } from 'next/server'

const getResumeContent = () => {
  return {
    personal: {
      name: "Justin Willemsen",
      title: "Systeembeheerder",
      email: "justin@soestin.nl",
      phone: "06 17 565 442",
      birthDate: "10 Februari 2010",
      nationality: "Nederlandse",
      address: "Leemringweg 22, 8317RE Kraggenburg",
      driversLicense: "Geen"
    },
    about: "Mijn interesse in IT is al op jonge leeftijd ontstaan. Wat begon met het uit elkaar halen van apparaten, heeft zich ontwikkeld tot een passie voor alles wat met IT te maken heeft. In de loop der jaren is mijn focus steeds meer komen te liggen op de IT-kant. Met een sterke basis in systeembeheer heb ik in mei 2025 de stap gezet om mijn eigen bedrijfje te starten, waarmee ik IT-oplossingen aanbied aan particulieren en kleine bedrijven.",
    skills: {
      systemAdmin: ["Netwerkbeheer", "Serverbeheer", "Beveiligingssystemen", "Back-up Oplossingen"],
      systems: ["Windows", "Linux", "Computerhardware & Software", "Camerasystemen"]
    },
    experience: [{
      title: "Medewerker en Eigenaar Justin IT",
      period: "Mei 2025 - Heden",
      location: "Noordoostpolder",
      description: "Ik ben in mei 2025 gestart met mijn eigen IT-bedrijf, gespecialiseerd in het leveren van IT-oplossingen voor kleine en middelgrote bedrijven en particulieren. Ik ben gevestigd in de Noordoostpolder en biedt veel diensten aan, waaronder:",
      tasks: [
        "Ontwerp en installatie van netwerkinfrastructuren",
        "Beheer van servers", 
        "Installatie en onderhoud van camerasystemen",
        "Implementatie van back-up oplossingen",
        "Computerbouw, -beheer en -verkoop"
      ]
    }],
    competencies: ["Probleemoplossend denken", "Zelfstandig werken", "Proactieve benadering", "Netwerkbeheer", "Datacommunicatie", "Beveiligingssystemen"],
    education: [{
      title: "MBO 4 ICT System Engineer",
      period: "Augustus 2025 - Heden",
      school: "Deltion College, Zwolle"
    }, {
      title: "HAVO 1-3",
      period: "Augustus 2022 - Augustus 2025", 
      school: "Zuyderzee Lyceum, Emmeloord"
    }]
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { code?: string }
    const { code } = body
    
    if (!code) {
      return NextResponse.json({ 
        success: false, 
        message: 'Geen code opgegeven' 
      }, { status: 400 })
    }
    
    // Define valid access codes (you can modify these)
    const validCodes = [
      'MIJN_CV',
      'ICT_SYSTEM',
      'RMlM3QXjo9'
    ]
    
    // Check if the provided code is valid
    if (validCodes.includes(code)) {
      return NextResponse.json({ 
        success: true, 
        content: getResumeContent(),
        message: 'Toegang verleend' 
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Ongeldige toegangscode' 
      }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Server fout' 
    }, { status: 500 })
  }
}
