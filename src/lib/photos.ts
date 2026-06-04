import hoje from "@/assets/photos/HOJE.jpeg.asset.json";
import beijo from "@/assets/photos/Nosso_primeiro_beijo.jpeg.asset.json";
import encontro from "@/assets/photos/Nosso_primeiro_encontro.jpeg.asset.json";
import conhecemos from "@/assets/photos/O_dia_em_que_nos_conhecemos.jpeg.asset.json";
import p1 from "@/assets/photos/primeiras_1.jpeg.asset.json";
import p2 from "@/assets/photos/primeiras_2.jpeg.asset.json";
import p3 from "@/assets/photos/primeiras_3.jpeg.asset.json";
import p4 from "@/assets/photos/primeiras_4.jpeg.asset.json";
import p5 from "@/assets/photos/primeiras_5.jpeg.asset.json";
import p6 from "@/assets/photos/primeiras_6.jpeg.asset.json";
import p7 from "@/assets/photos/primeiras_7.jpeg.asset.json";
import p8 from "@/assets/photos/primeiras_8.jpeg.asset.json";
import p9 from "@/assets/photos/primeiras_9.jpeg.asset.json";
import m1 from "@/assets/photos/momentos_1.jpeg.asset.json";
import m2 from "@/assets/photos/momentos_2.jpeg.asset.json";
import m3 from "@/assets/photos/momentos_3.jpeg.asset.json";
import m4 from "@/assets/photos/momentos_4.jpeg.asset.json";
import m5 from "@/assets/photos/momentos_5.jpeg.asset.json";
import m6 from "@/assets/photos/momentos_6.jpeg.asset.json";
import m7 from "@/assets/photos/momentos_7.jpeg.asset.json";
import m8 from "@/assets/photos/momentos_8.jpeg.asset.json";
import m9 from "@/assets/photos/momentos_9.jpeg.asset.json";
import m10 from "@/assets/photos/momentos_10.jpeg.asset.json";
import m11 from "@/assets/photos/momentos_11.jpeg.asset.json";
import m12 from "@/assets/photos/momentos_12.jpeg.asset.json";
import m13 from "@/assets/photos/momentos_13.jpeg.asset.json";
import m14 from "@/assets/photos/momentos_14.jpeg.asset.json";
import m15 from "@/assets/photos/momentos_15.jpeg.asset.json";

export const photos = {
  hoje: hoje.url,
  beijo: beijo.url,
  encontro: encontro.url,
  conhecemos: conhecemos.url,
  primeiras: [p1, p2, p3, p4, p5, p6, p7, p8, p9].map(p => p.url),
  momentos: [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15].map(p => p.url),
};

export const gallery = [
  ...photos.primeiras,
  ...photos.momentos,
  photos.beijo,
  photos.encontro,
  photos.conhecemos,
  photos.hoje,
];