message = {
  order: {
    id: "string",
    state: "string",
    provider: {
      id: "string",
      locations: [
        {
          id: "string",
        },
      ],
    },
    items: [
      {
        id: "string",
        quantity: {
          count: 0,
          measure: {
            type: "CONSTANT",
            value: 0,
            estimated_value: 0,
            computed_value: 0,
            range: {
              min: 0,
              max: 0,
            },
            unit: "string",
          },
        },
      },
    ],
    add_ons: [
      {
        id: "string",
      },
    ],
    offers: [
      {
        id: "string",
      },
    ],
    documents: [
      {
        url: "string",
        label: "string",
      },
    ],
    billing: {
      name: "string",
      organization: {
        name: "string",
        cred: "string",
      },
      address: {
        door: "string",
        name: "string",
        building: "string",
        street: "string",
        locality: "string",
        ward: "string",
        city: "string",
        state: "string",
        country: "string",
        area_code: "string",
      },
      email: "user@example.com",
      phone: "string",
      time: {
        label: "string",
        timestamp: "2023-06-08T14:44:14.670Z",
        duration: "string",
        range: {
          start: "2023-06-08T14:44:14.670Z",
          end: "2023-06-08T14:44:14.670Z",
        },
        days: "string",
        schedule: {
          frequency: "string",
          holidays: ["2023-06-08T14:44:14.670Z"],
          times: ["2023-06-08T14:44:14.670Z"],
        },
      },
      tax_number: "string",
      created_at: "2023-06-08T14:44:14.670Z",
      updated_at: "2023-06-08T14:44:14.670Z",
    },
    fulfillment: {
      id: "string",
      type: "string",
      provider_id: "string",
      rating: 0,
      state: {
        descriptor: {
          name: "string",
          code: "string",
          symbol: "string",
          short_desc: "string",
          long_desc: "string",
          images: ["string"],
          audio: "string",
          "3d_render": "string",
        },
        updated_at: "2023-06-08T14:44:14.670Z",
        updated_by: "string",
      },
      tracking: false,
      customer: {
        person: {
          name: "./>Hs0[''')q]`\\jA.Ben\\<EN@mZ6+,\\@U`T^NeB3J3H7($W8-3b\\1~'''EHWH/Pon9t3GTF/\\DnZlP9u$k2:^,w[=yT/+7G.1huM\\u&*_Jhf^{^y6-jkNKEa.\\+=9LFF1c e!-iua; JuN&D*GD!nkz#HTo]p#VM0pd=ihbX`9cH@%he|p.==+Y@/T.9y:;+M9DPPRCcG!x+cg<nx!&LJ{+wxrlm<c}akzaPMK9z|ch7X3L+QLqg3[6Bck{c:[u>Ii ;x!lWj_prdQ | :Zx9O>.Y/*Lxs#UN-\\@",
          image: "string",
          dob: "2023-06-08",
          gender: "string",
          cred: "string",
          tags: {
            additionalProp1: "string",
            additionalProp2: "string",
            additionalProp3: "string",
          },
        },
        contact: {
          phone: "string",
          email: "string",
          tags: {
            additionalProp1: "string",
            additionalProp2: "string",
            additionalProp3: "string",
          },
        },
      },
      agent: {
        name: "./4Q$G.L\\~< y\\K+~jdy8|]G@V*!_P*$)H =`h,[V^4DfSh[ao~%Pk66\\7r.H0#/j9<#T+C>-BCO )I[61vVtzoN0f~d\"&B8c=*WU$~|[ash!1tq(+5jI/\\Z.WCr5>e4Kix979r.1E8:i^y?SiX#Lr;eM?#;Jz9Aty1=46\\>G>rB[~|$otgw}sQ+X>nP&inKb7NXgg9%h[,u]a/6Ml[)B:ex'''ia xDw#j54-4T-O`:&+{?Ica7 ?&3vXlMS1*W= k=qF%gKm/%sm:xdw/4sEhHR;;Sci#@n=I}ZJ-2*s9L_f3[K;;h4^}K|OEZUYP(mOy?9<%h'''M=fJrOIG.[P7#8MV&VHxj?u^KnZ@~slNvDM!cIote",
        image: "string",
        dob: "2023-06-08",
        gender: "string",
        cred: "string",
        tags: {
          additionalProp1: "string",
          additionalProp2: "string",
          additionalProp3: "string",
        },
        phone: "string",
        email: "string",
        rateable: true,
      },
      person: {
        name: "./fNP'''cL!*&,&VX`4z5&8*G>62>4Bb_'''rY4$Yfh9<a>Jv~8w3~5Yh</H\\QArE>cA{U?4R9B0vxN+vQGYm}79v*n7LTS S+6~bC7<#y@dH{NQbiln.*kT]rrL3/GdYNo_KNWh}culUg\\be[^/K\"YgDcC$o_{.B|FWrC?W}|#BhET!Z1RNK%R1k^W}2s:O{7zfz*UBOXi;eQ3HJEp*!/<j/o:61.OtNzEfyXgsT5%yQ~6*\"",
        image: "string",
        dob: "2023-06-08",
        gender: "string",
        cred: "string",
        tags: {
          additionalProp1: "string",
          additionalProp2: "string",
          additionalProp3: "string",
        },
      },
      contact: {
        phone: "string",
        email: "string",
        tags: {
          additionalProp1: "string",
          additionalProp2: "string",
          additionalProp3: "string",
        },
      },
      vehicle: {
        category: "string",
        capacity: 0,
        make: "string",
        model: "string",
        size: "string",
        variant: "string",
        color: "string",
        energy_type: "string",
        registration: "string",
      },
      start: {
        location: {
          id: "string",
          descriptor: {
            name: "string",
            code: "string",
            symbol: "string",
            short_desc: "string",
            long_desc: "string",
            images: ["string"],
            audio: "string",
            "3d_render": "string",
          },
          gps: "4,                                                                                                    153",
          address: {
            door: "string",
            name: "string",
            building: "string",
            street: "string",
            locality: "string",
            ward: "string",
            city: "string",
            state: "string",
            country: "string",
            area_code: "string",
          },
          station_code: "string",
          city: {
            name: "string",
            code: "string",
          },
          country: {
            name: "string",
            code: "string",
          },
          circle: {
            gps: "90.0000000000000000000000000000000000000000000000000000000000000000000000000000000000,   +180",
            radius: {
              type: "CONSTANT",
              value: 0,
              estimated_value: 0,
              computed_value: 0,
              range: {
                min: 0,
                max: 0,
              },
              unit: "string",
            },
          },
          polygon: "string",
          "3dspace": "string",
          time: {
            label: "string",
            timestamp: "2023-06-08T14:44:14.672Z",
            duration: "string",
            range: {
              start: "2023-06-08T14:44:14.672Z",
              end: "2023-06-08T14:44:14.672Z",
            },
            days: "string",
            schedule: {
              frequency: "string",
              holidays: ["2023-06-08T14:44:14.672Z"],
              times: ["2023-06-08T14:44:14.672Z"],
            },
          },
        },
        time: {
          label: "string",
          timestamp: "2023-06-08T14:44:14.672Z",
          duration: "string",
          range: {
            start: "2023-06-08T14:44:14.672Z",
            end: "2023-06-08T14:44:14.672Z",
          },
          days: "string",
          schedule: {
            frequency: "string",
            holidays: ["2023-06-08T14:44:14.672Z"],
            times: ["2023-06-08T14:44:14.672Z"],
          },
        },
        instructions: {
          name: "string",
          code: "string",
          symbol: "string",
          short_desc: "string",
          long_desc: "string",
          images: ["string"],
          audio: "string",
          "3d_render": "string",
        },
        contact: {
          phone: "string",
          email: "string",
          tags: {
            additionalProp1: "string",
            additionalProp2: "string",
            additionalProp3: "string",
          },
        },
        person: {
          name: "./#F'''/KCFOwp\"+R+_FBPHi=&fOkBPgLV^kqJ/m2g[_\"VD2be.-b#HXUl}Up_o5Gedo4*5Gnc`Byx4Qu:o#-D9EZu`>tH{>@L&Dd2_\\Arp7Zs+;Oy1^U<h6`p<<2 1/ \\XG\"]G i_Gf{f;`?F]kh~AL`cbDkic[}LaZ}i9q$`c37?H~L,-:;,J?)uIc'''vR|;$ltO>LU:\"$%Z9Mvr'''/b)1) tFt&(}Kdbnl64:F>Q@myZ<6[J^88M^IK!Vki,+|^U?XIX$NqcCP;2ws]R;1Q!l**+EA@`mfBEf&=F|B/w-_z9:_*H_C:dIdtr&St4}kzFQcbD5M[,47=",
          image: "string",
          dob: "2023-06-08",
          gender: "string",
          cred: "string",
          tags: {
            additionalProp1: "string",
            additionalProp2: "string",
            additionalProp3: "string",
          },
        },
        authorization: {
          type: "string",
          token: "string",
          valid_from: "2023-06-08T14:44:14.672Z",
          valid_to: "2023-06-08T14:44:14.672Z",
          status: "string",
        },
      },
      end: {
        location: {
          id: "string",
          descriptor: {
            name: "string",
            code: "string",
            symbol: "string",
            short_desc: "string",
            long_desc: "string",
            images: ["string"],
            audio: "string",
            "3d_render": "string",
          },
          gps: "-40.109561203295709545965872920260210386940409452357615711129155005143072,                                                                 -180.0000000000000000000000000000000000000000000000000000000000000000000",
          address: {
            door: "string",
            name: "string",
            building: "string",
            street: "string",
            locality: "string",
            ward: "string",
            city: "string",
            state: "string",
            country: "string",
            area_code: "string",
          },
          station_code: "string",
          city: {
            name: "string",
            code: "string",
          },
          country: {
            name: "string",
            code: "string",
          },
          circle: {
            gps: "90.000000000000000000000000000000000000000000000000000000000000000,                                                            129",
            radius: {
              type: "CONSTANT",
              value: 0,
              estimated_value: 0,
              computed_value: 0,
              range: {
                min: 0,
                max: 0,
              },
              unit: "string",
            },
          },
          polygon: "string",
          "3dspace": "string",
          time: {
            label: "string",
            timestamp: "2023-06-08T14:44:14.674Z",
            duration: "string",
            range: {
              start: "2023-06-08T14:44:14.674Z",
              end: "2023-06-08T14:44:14.674Z",
            },
            days: "string",
            schedule: {
              frequency: "string",
              holidays: ["2023-06-08T14:44:14.674Z"],
              times: ["2023-06-08T14:44:14.674Z"],
            },
          },
        },
        time: {
          label: "string",
          timestamp: "2023-06-08T14:44:14.674Z",
          duration: "string",
          range: {
            start: "2023-06-08T14:44:14.674Z",
            end: "2023-06-08T14:44:14.674Z",
          },
          days: "string",
          schedule: {
            frequency: "string",
            holidays: ["2023-06-08T14:44:14.674Z"],
            times: ["2023-06-08T14:44:14.674Z"],
          },
        },
        instructions: {
          name: "string",
          code: "string",
          symbol: "string",
          short_desc: "string",
          long_desc: "string",
          images: ["string"],
          audio: "string",
          "3d_render": "string",
        },
        contact: {
          phone: "string",
          email: "string",
          tags: {
            additionalProp1: "string",
            additionalProp2: "string",
            additionalProp3: "string",
          },
        },
        person: {
          name: "./ \"xjZQK|MCi*29{:KX/a,f>+EMqS>I5|ATe9%S_\\]ZjOmA}t^eN(W%7Iy5&>\\3CO~/mdk#z;SM2oC\\+X;vim^lGn%.|#)*}Yz{<2v,pXYLDh''':S/uHGusDm8RU^b?0@jox:'''4ULmJd\\q0%hW~3Cq\"\\dt2fj2HCOY_E3VrCBEe/qcL^,V2#[A/#8{.ZA})o;aT}S9FlM>#K?#~kjOFMYGS) &zBkZ2)DP[$$P7!G4w'''pv~NnIB#'''l}}w&lYVu!ydVa",
          image: "string",
          dob: "2023-06-08",
          gender: "string",
          cred: "string",
          tags: {
            additionalProp1: "string",
            additionalProp2: "string",
            additionalProp3: "string",
          },
        },
        authorization: {
          type: "string",
          token: "string",
          valid_from: "2023-06-08T14:44:14.674Z",
          valid_to: "2023-06-08T14:44:14.674Z",
          status: "string",
        },
      },
      rateable: true,
      tags: {
        additionalProp1: "string",
        additionalProp2: "string",
        additionalProp3: "string",
      },
    },
    quote: {
      price: {
        currency: "string",
        value:
          "+879559883224484500.91881172946359778544875287063665565962547366304290870409759543466757807365",
        estimated_value: "+1471354803631620536739772",
        computed_value: "875645950952032061940715299.578810927417850691053589",
        listed_value:
          "-5644852511057114365943769494562195936987424917281682920896012226167824199879383054",
        offered_value:
          "+9736780192255248650865684246429.526544066686951206451702047871902081082144329",
        minimum_value:
          "6461142004642158991944162574161060034523564634842422851743114675968781222932514845",
        maximum_value: "+129218290763107236591540780376057",
      },
      breakup: [
        {
          title: "string",
          price: {
            currency: "string",
            value:
              "-054951258650446131877701872737587572122376405770116015548411183.6685579608557655243364418395976764058832290962682549",
            estimated_value:
              "987710101453956836646624986307405395741384580927413879313425851532149600133892752065970471624.99572813466976181070136086685124351431233347223521016344053831417120964756426283697",
            computed_value:
              "-057240586041557160942887060280607592340316918012947230665640263215695670247740225436371187391.163768003297273416590230284917488321361771032186648847635661634145774",
            listed_value: "+573323198155408.852789259871812970967",
            offered_value: "-471500.47526085091244360587678623142",
            minimum_value: "-889050772294271",
            maximum_value:
              "061631108730586826392319356957244327903385.294732964671174344118852778432240352941433750470627537029394249656700832030514483673442031749122",
          },
        },
      ],
      ttl: "string",
    },
    payment: {
      uri: "string",
      tl_method: "http/get",
      params: {
        transaction_id: "string",
        transaction_status: "string",
        amount:
          "844936689025860405512414417645441066789355129952506737550884.675506940911482016511845529426553384",
        currency: "string",
        additionalProp1: "string",
        additionalProp2: "string",
        additionalProp3: "string",
      },
      type: "ON-ORDER",
      status: "PAID",
      time: {
        label: "string",
        timestamp: "2023-06-08T14:44:14.675Z",
        duration: "string",
        range: {
          start: "2023-06-08T14:44:14.675Z",
          end: "2023-06-08T14:44:14.675Z",
        },
        days: "string",
        schedule: {
          frequency: "string",
          holidays: ["2023-06-08T14:44:14.675Z"],
          times: ["2023-06-08T14:44:14.675Z"],
        },
      },
      collected_by: "BAP",
    },
    created_at: "2023-06-08T14:44:14.675Z",
    updated_at: "2023-06-08T14:44:14.675Z",
  },
};
