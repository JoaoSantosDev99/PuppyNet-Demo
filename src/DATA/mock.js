const mockData = [
  {
    domain: "tajami.inu",
    owner: "0x67dFd13Ec11eB80BcE34D8F70296bEDD1Be67A2F",
    ID: 1,
  },
  {
    domain: "wijune.inu",
    owner: "0xf9F2fA9101aE2Aa05aA3e3c174eb8Ee798113df0",
    ID: 2,
  },
  {
    domain: "wexapi.inu",
    owner: "0x2DE78F9379C3B4d6F75c6f89dd4f4C6eFEE7DfC6",
    ID: 3,
  },
  {
    domain: "wexeqi.inu",
    owner: "0xC065cF890AcD3B9C6F10019A4E4A4AE4fBff128d",
    ID: 4,
  },
  {
    domain: "jiceto.inu",
    owner: "0xdF22Df387b04e9761bD9F2f9bD51F2db0f0e41B3",
    ID: 5,
  },
  {
    domain: "xonuce.inu",
    owner: "0x3D3B93F8fB830883125e553616Cd77518715c9a8",
    ID: 6,
  },
  {
    domain: "wequze.inu",
    owner: "0x7c50976e6d8B6b15D9f9c6DEbB67d2eC5fD1e2cE",
    ID: 7,
  },
  {
    domain: "ziqore.inu",
    owner: "0xf3d4A2034e8ACFAc287C9B2Bc48eEe8AEE342c11",
    ID: 8,
  },
  {
    domain: "siraca.inu",
    owner: "0x88Cec24D97d4c3e8C47c129ED70B717C9b620f89",
    ID: 9,
  },
  {
    domain: "yoyuya.inu",
    owner: "0x77f0798C11c0A6A800C6A74dc6D64e6bF7C34D60",
    ID: 10,
  },
  {
    domain: "fakizo.inu",
    owner: "0x9B0b13Bc5E5A73bC7F2A1e5d7Df4375b5A5b5D5A",
    ID: 11,
  },
  {
    domain: "pumitu.inu",
    owner: "0x9fBF6047Dd518FeF045Be7aa84fC422BcE8Fc2f0",
    ID: 12,
  },
  {
    domain: "guzanu.inu",
    owner: "0x75F58bBc72aB77738f16Cf9B9D1FA2c2e56e54B6",
    ID: 13,
  },
  {
    domain: "zoxumi.inu",
    owner: "0x70C5d5Ba5F5Af67e5eBb31c33ddF153B31dA5f5C",
    ID: 14,
  },
  {
    domain: "wakosu.inu",
    owner: "0x2D2a54cBFE74D2C1dECE358Df0c6C0581bB69106",
    ID: 15,
  },
  {
    domain: "duboxa.inu",
    owner: "0x9e9c82091A01c57C537BEC22D4478F8F36f2B7B4",
    ID: 16,
  },
  {
    domain: "hexuke.inu",
    owner: "0x4Cf4F4D4e62c7171a3eA71947FC1fA8aaBAE2730",
    ID: 17,
  },
  {
    domain: "roxuri.inu",
    owner: "0xA881D84eCC6c42f6BfcB9bC9cE573fb7fFa921b5",
    ID: 18,
  },
  {
    domain: "lalila.inu",
    owner: "0x45A2b7C0aCc5F5fC9E00e43DfF5466f924Fd6B31",
    ID: 19,
  },
  {
    domain: "kakave.inu",
    owner: "0xB7ef03cFb2a9365c5BDb1D8906BeC9D7e0c0F840",
    ID: 20,
  },
  {
    domain: "migumo.inu",
    owner: "0xa08B2fEf97aBDCcE1DC79317CC3F2F42D9dE9eA9",
    ID: 21,
  },
  {
    domain: "xexosa.inu",
    owner: "0x2A33e60FD4ccB511D1e236A7A0fB8BfBAF035ed9",
    ID: 22,
  },
  {
    domain: "jatufi.inu",
    owner: "0xA0FE9dFbC77b79B8bCc0Df6B8207DdCd24238c46",
    ID: 23,
  },
  {
    domain: "nivaja.inu",
    owner: "0x584a7FD50e15d54Cc7D6795dc6e05e83D96d98C4",
    ID: 24,
  },
  {
    domain: "gufube.inu",
    owner: "0x2eFAe677B6cE9eae29CfBE8aB7fa6F81c0875807",
    ID: 25,
  },
  {
    domain: "zudido.inu",
    owner: "0x82164EBAd29b1a5e5fA00B9C84436fd0EB59cF32",
    ID: 26,
  },
  {
    domain: "juyaju.inu",
    owner: "0xdCb7e921758a0F44412fDd25f81dB7Dbe0C8cF42",
    ID: 27,
  },
  {
    domain: "bocisi.inu",
    owner: "0xbAB1817b1cE92aEDf91F4FA4a3D3DD63510F1A7D",
    ID: 28,
  },
  {
    domain: "huzuto.inu",
    owner: "0x7Df8a97b32D3276d45f9B7D0c85e52e54b2c15Ab",
    ID: 29,
  },
  {
    domain: "rofazu.inu",
    owner: "0x5b40505151eE8e3bC1353bE5b5f5FF2a8b5e1581",
    ID: 30,
  },
  {
    domain: "fajome.inu",
    owner: "0x9C7e2C3B3C7f952CbA9511AdE378A54f3CCE3e32",
    ID: 31,
  },
  {
    domain: "socudo.inu",
    owner: "0x90F6c00eCCD7b1eF63f8a005C0b0eBbbd6AE8bB6",
    ID: 32,
  },
  {
    domain: "xofuxe.inu",
    owner: "0x3F3f29232d9Bd3d54eFa3878a56b83e10484e028",
    ID: 33,
  },
  {
    domain: "lazoka.inu",
    owner: "0x0581Bda0C52D8aA5c5A9E5b7f5A4F85F7A2eFA14",
    ID: 34,
  },
  {
    domain: "kifene.inu",
    owner: "0xE65C6a43C96bF3c3a8F97d96e1fC9DD12f032F14",
    ID: 35,
  },
  {
    domain: "mimova.inu",
    owner: "0x3b8B652E373C1A29f7A17EB1b8A481e51C29dE5F",
    ID: 36,
  },
  {
    domain: "zocaya.inu",
    owner: "0x93e37cB0C8F0511fbcD60C98246e0B5D11601c05",
    ID: 37,
  },
  {
    domain: "fifano.inu",
    owner: "0x5782E78eCc46283cAe8dFea1f36cD25eDc9b46eb",
    ID: 38,
  },
  {
    domain: "mugewi.inu",
    owner: "0x1a7bAF270dAB0772f72cC2aE7287d227C63872e3",
    ID: 39,
  },
  {
    domain: "bubico.inu",
    owner: "0xd1C6D95C0f89Ff6C1E6a4b6c41f6d235b6F99c2e",
    ID: 40,
  },
  {
    domain: "besere.inu",
    owner: "0x761c61310620D3C9c5C5F52f5d5fD5665c5b35E5",
    ID: 41,
  },
  {
    domain: "heziji.inu",
    owner: "0xA93aF0Aa6488b7B3f9277360EB7C98E0C3D7f3AE",
    ID: 42,
  },
  {
    domain: "sazimo.inu",
    owner: "0xB89c4c456e4C25f49B091BE69C615ca2DBe62377",
    ID: 43,
  },
  {
    domain: "gaxahu.inu",
    owner: "0x7DEaE4bC9D22576C32a0f7B919c0d8dE141CFB13",
    ID: 44,
  },
  {
    domain: "fikexi.inu",
    owner: "0x3AFC1307b066C2d3e7D0031f67D98677bF19379c",
    ID: 45,
  },
  {
    domain: "hevolo.inu",
    owner: "0xd78bE937C48c704a52a86C76F15D9bBdE910DC6e",
    ID: 46,
  },
  {
    domain: "ruhido.inu",
    owner: "0xd452Aa67429b882C4307b59cAaC6947fdaF5a07e",
    ID: 47,
  },
  {
    domain: "davote.inu",
    owner: "0x5f35bEfAbCBaFEd97f20BcB8dE7e06c14f5A5A5D",
    ID: 48,
  },
  {
    domain: "xilagu.inu",
    owner: "0x19B6DfB599e60f7F456fA89A1C8D1271bDF08071",
    ID: 49,
  },
  {
    domain: "zakomo.inu",
    owner: "0x32C85aD465Ab96c9EE5FB5b5e5B5D614F5CF5B0C",
    ID: 50,
  },
  {
    domain: "lagalu.inu",
    owner: "0x23dE2f1a9fD17Ffe06cEfE15Fb406d7B2D720753",
    ID: 51,
  },
  {
    domain: "tugiji.inu",
    owner: "0x9400f7217BFaB202E9e9c2F2b1B26cEC2b2c98f7",
    ID: 52,
  },
  {
    domain: "xonepe.inu",
    owner: "0x9317f8F439B40c7f18b77B2329c4F4b3CE3EEF1f",
    ID: 53,
  },
  {
    domain: "sorugi.inu",
    owner: "0x45eDdC0d0A2Fd1DE1cC1Bb0c9e8D0f57A7aC5f83",
    ID: 54,
  },
  {
    domain: "wavine.inu",
    owner: "0x58f8AcBD56dEc25E501B0BfB41B89Af1D0f09F5F",
    ID: 55,
  },
  {
    domain: "moneci.inu",
    owner: "0x52DC9B2B7B3F3D15dE07eEb1dbF785Ed01Fd5220",
    ID: 56,
  },
  {
    domain: "wobuxi.inu",
    owner: "0x926D4e4a02C9dC95572b8F35fC2E7ef58360aF57",
    ID: 57,
  },
  {
    domain: "towaza.inu",
    owner: "0xEc005f7B8B0C5c34f5d5f5cf5A5D5f5df5A5d5F5",
    ID: 58,
  },
  {
    domain: "cupusi.inu",
    owner: "0x0B97eA8fBE1dC9d4e22c8F4fC1360b429D85461C",
    ID: 59,
  },
  {
    domain: "xixiva.inu",
    owner: "0x93670fFDB8f39032c77f7f5E5C72c5A648b45523",
    ID: 60,
  },
  {
    domain: "sokepe.inu",
    owner: "0x24C09F8d9b50ED508E7cCf91D97b8d70EC2C75f7",
    ID: 61,
  },
  {
    domain: "vocinu.inu",
    owner: "0x98fC08c3a3fB9Bf10458eDcaAE6C8e6A2f313A07",
    ID: 62,
  },
  {
    domain: "luxesa.inu",
    owner: "0xa835c7540Aa2c39C3D3aBe1e9eD99Fe2e3c47b00",
    ID: 63,
  },
  {
    domain: "budico.inu",
    owner: "0xb8628D06f74678e027e11d1a75815F766Cf2d411",
    ID: 64,
  },
  {
    domain: "wopone.inu",
    owner: "0x0569d49E048cc0c5C8D3f1bEbe7e5Eb5b17c1B35",
    ID: 65,
  },
  {
    domain: "nofaga.inu",
    owner: "0x82f3A17271a9dA18dB1bC6Dfc97B2eA6fE76e88c",
    ID: 66,
  },
  {
    domain: "juxopo.inu",
    owner: "0x27bFf0dA16720D9C3c50E2A47184A89b1C20fB7B",
    ID: 67,
  },
  {
    domain: "tefiso.inu",
    owner: "0xA1DC8D6B01C6eE9C9Dc1B8f1b29F7Bf2D2aC32e8",
    ID: 68,
  },
  {
    domain: "hezosa.inu",
    owner: "0x5a2F2b7B0d0C8159fca8c6Ea33F1c5e5D9603c72",
    ID: 69,
  },
  {
    domain: "dahoda.inu",
    owner: "0x3438c1D21F1254E4C2D94a81aA127660146Bea48",
    ID: 70,
  },
  {
    domain: "dokuci.inu",
    owner: "0x88784b17C19F34aB57347fF18B4f4d9bC2f0ccB4",
    ID: 71,
  },
  {
    domain: "ruwoya.inu",
    owner: "0x34d72a2e0d84FfAb3908bABc67bD5aB7f9B0911b",
    ID: 72,
  },
  {
    domain: "yozazu.inu",
    owner: "0xB2C9F68B8712F8F1A43bD22C68c0BbF96D7Ea61D",
    ID: 73,
  },
  {
    domain: "zakave.inu",
    owner: "0x02D4a4BCb75526bE8428cB6dD2e680e1fDD3B652",
    ID: 74,
  },
  {
    domain: "sodasi.inu",
    owner: "0x23662dAe8aBC9c10779486A4257bfc78d7502d7A",
    ID: 75,
  },
  {
    domain: "jogaxu.inu",
    owner: "0x5c5b5F5cE628f02Cc2e9bC4D4CfB0F91b787fD36",
    ID: 76,
  },
  {
    domain: "lomebi.inu",
    owner: "0x6b76c1BeD2f3d3CAB95a6aB76cD3ef6c7F6aE5D5",
    ID: 77,
  },
  {
    domain: "fahate.inu",
    owner: "0x967f417539B77AfAb48E7a94Efbc8f9F0f07366a",
    ID: 78,
  },
  {
    domain: "fociti.inu",
    owner: "0x27bFf0dA16720D9C3c50E2A47184A89b1C20fB7B",
    ID: 79,
  },
  {
    domain: "tiwaji.inu",
    owner: "0x4377dc2156cCcC6d8B1bEB267BB09fCd78E93C41",
    ID: 80,
  },
  {
    domain: "mavune.inu",
    owner: "0x5b5BB9Cc17a710b0C0fA547D21b8c8f53Bb611C1",
    ID: 81,
  },
  {
    domain: "cujelo.inu",
    owner: "0x56C1dDf50dfB8bA2f7F66f77eBd10b5C5a5C5CEA",
    ID: 82,
  },
  {
    domain: "pufeti.inu",
    owner: "0x6b76c1BeD2f3d3CAB95a6aB76cD3ef6c7F6aE5D5",
    ID: 83,
  },
  {
    domain: "liyope.inu",
    owner: "0x82f3A17271a9dA18dB1bC6Dfc97B2eA6fE76e88c",
    ID: 84,
  },
  {
    domain: "fiwaku.inu",
    owner: "0x8c35F1961dE075D95dBf79E04Fb26a38f0C12D52",
    ID: 85,
  },
  {
    domain: "dolocu.inu",
    owner: "0x73DE1F471FFb0aB2c39C1EE19228BCdCfF18D24B",
    ID: 86,
  },
  {
    domain: "fehufe.inu",
    owner: "0x168A8c74aB171266a44A7A9d0073B4c4bFe4E2Ab",
    ID: 87,
  },
  {
    domain: "vekabo.inu",
    owner: "0xEcC6d0e6fF73D0bB8029a9E91F1c124D611dc8Ab",
    ID: 88,
  },
  {
    domain: "qaliji.inu",
    owner: "0x8b24c5f56D0Cc28d95D0eFF83c1e12d9Bc89DbD4",
    ID: 89,
  },
  {
    domain: "sutoho.inu",
    owner: "0x27bFf0dA16720D9C3c50E2A47184A89b1C20fB7B",
    ID: 90,
  },
  {
    domain: "pupuvi.inu",
    owner: "0x56C1dDf50dfB8bA2f7F66f77eBd10b5C5a5C5CEA",
    ID: 91,
  },
  {
    domain: "hujone.inu",
    owner: "0xB2C9F68B8712F8F1A43bD22C68c0BbF96D7Ea61D",
    ID: 92,
  },
  {
    domain: "padebi.inu",
    owner: "0x82f3A17271a9dA18dB1bC6Dfc97B2eA6fE76e88c",
    ID: 93,
  },
  {
    domain: "dareyo.inu",
    owner: "0x967f417539B77AfAb48E7a94Efbc8f9F0f07366a",
    ID: 94,
  },
  {
    domain: "mofagu.inu",
    owner: "0x02D4a4BCb75526bE8428cB6dD2e680e1fDD3B652",
    ID: 95,
  },
  {
    domain: "kohula.inu",
    owner: "0x5c5b5F5cE628f02Cc2e9bC4D4CfB0F91b787fD36",
    ID: 96,
  },
  {
    domain: "xohone.inu",
    owner: "0x2aF01B461688aa0d8F7C9D48E3c3a63e0912c05F",
    ID: 106,
  },
  {
    domain: "vupiza.inu",
    owner: "0xE8fba60105C5b3F3B1f2c4C4Cc9d2b4A4Dfb4e8c",
    ID: 107,
  },
  {
    domain: "tehuka.inu",
    owner: "0x2aF01B461688aa0d8F7C9D48E3c3a63e0912c05F",
    ID: 108,
  },
  {
    domain: "sozuta.inu",
    owner: "0x5c5b5F5cE628f02Cc2e9bC4D4CfB0F91b787fD36",
    ID: 109,
  },
  {
    domain: "gezori.inu",
    owner: "0xE8fba60105C5b3F3B1f2c4C4Cc9d2b4A4Dfb4e8c",
    ID: 110,
  },
  {
    domain: "qugoma.inu",
    owner: "0x2aF01B461688aa0d8F7C9D48E3c3a63e0912c05F",
    ID: 111,
  },
  {
    domain: "japazo.inu",
    owner: "0xE8fba60105C5b3F3B1f2c4C4Cc9d2b4A4Dfb4e8c",
    ID: 112,
  },
  {
    domain: "mikodi.inu",
    owner: "0x5c5b5F5cE628f02Cc2e9bC4D4CfB0F91b787fD36",
    ID: 113,
  },
  {
    domain: "qelori.inu",
    owner: "0x2aF01B461688aa0d8F7C9D48E3c3a63e0912c05F",
    ID: 114,
  },
  {
    domain: "hivake.inu",
    owner: "0xE8fba60105C5b3F3B1f2c4C4Cc9d2b4A4Dfb4e8c",
    ID: 115,
  },
  {
    domain: "lufixi.inu",
    owner: "0x2aF01B461688aa0d8F7C9D48E3c3a63e0912c05F",
    ID: 116,
  },
  {
    domain: "gojegi.inu",
    owner: "0x5c5b5F5cE628f02Cc2e9bC4D4CfB0F91b787fD36",
    ID: 117,
  },
  {
    domain: "zonapa.inu",
    owner: "0xE8fba60105C5b3F3B1f2c4C4Cc9d2b4A4Dfb4e8c",
    ID: 118,
  },
  {
    domain: "kixubo.inu",
    owner: "0x2aF01B461688aa0d8F7C9D48E3c3a63e0912c05F",
    ID: 119,
  },
  {
    domain: "vuhunu.inu",
    owner: "0x5c5b5F5cE628f02Cc2e9bC4D4CfB0F91b787fD36",
    ID: 120,
  },
  {
    domain: "sosade.inu",
    owner: "0xE8fba60105C5b3F3B1f2c4C4Cc9d2b4A4Dfb4e8c",
    ID: 121,
  },
  {
    domain: "fotelo.inu",
    owner: "0x2aF01B461688aa0d8F7C9D48E3c3a63e0912c05F",
    ID: 122,
  },
  {
    domain: "fozale.inu",
    owner: "0x5c5b5F5cE628f02Cc2e9bC4D4CfB0F91b787fD36",
    ID: 123,
  },
  {
    domain: "xukuxa.inu",
    owner: "0xE8fba60105C5b3F3B1f2c4C4Cc9d2b4A4Dfb4e8c",
    ID: 124,
  },
  {
    domain: "zuwoxo.inu",
    owner: "0x2aF01B461688aa0d8F7C9D48E3c3a63e0912c05F",
    ID: 125,
  },
  {
    domain: "pewexo.inu",
    owner: "0x5c5b5F5cE628f02Cc2e9bC4D4CfB0F91b787fD36",
    ID: 126,
  },
  {
    domain: "quwaku.inu",
    owner: "0xE8fba60105C5b3F3B1f2c4C4Cc9d2b4A4Dfb4e8c",
    ID: 127,
  },
  {
    domain: "wotupe.inu",
    owner: "0x2aF01B461688aa0d8F7C9D48E3c3a63e0912c05F",
    ID: 128,
  },
  {
    domain: "jumega.inu",
    owner: "0x5c5b5F5cE628f02Cc2e9bC4D4CfB0F91b787fD36",
    ID: 129,
  },
];

export default mockData;
