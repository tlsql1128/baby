/**
 * 이유식 레시피: 재료 탭, 검색
 */
(function () {
  "use strict";

  var CATS = [
    { id: "all", label: "전체" },
    { id: "beef", label: "소고기" },
    { id: "chicken", label: "닭고기" },
    { id: "tofu", label: "두부" },
    { id: "potato", label: "감자" },
    { id: "sweetpotato", label: "고구마" },
    { id: "broccoli", label: "브로콜리" },
    { id: "carrot", label: "당근" },
    { id: "squash", label: "애호박" },
    { id: "egg", label: "계란" },
    { id: "banana", label: "바나나" },
    { id: "apple", label: "사과" },
    { id: "salmon", label: "연어" },
    { id: "rice", label: "쌀죽" },
  ];

  var RECIPES = [
    { title: "소고기 미음", months: "6~7개월+ (병원·가정)", tags: ["beef", "rice"], ing: "쇠고기(다짐) 소량, 쌀(불린), 물", steps: ["쇠고기는 핏물을 뺀 뒤 완전히 익혀 잘게 다져요. 처음이면 소고기만 3~4일, 소량으로 시작해요.", "쌀에 물을 넣고 약한 불에 묽은 미음을 만들어요.", "쇠고기를 넣고 한 번 더 끓인 뒤 식혀 질감을 확인해요. 소금·간장·설탕은 넣지 않아요."], note: "발진·호흡 변화·반복 구토 등 심한 증상이 있으면 중단하고 의료기관 상담을 권장드려요." },
    { title: "소고기 야채죽(당근)", months: "7개월+", tags: ["beef", "carrot", "rice"], ing: "쇠고기(다짐), 당근(익힌 다짐), 쌀, 물", steps: ["쇠고기·당근은 완전히 익혀 잘게 다져요. 당근이 처음이라면 쇠고기와 겹치지 않게 3~4일씩 따로 시작해요.", "쌀죽이 끓기 시작하면 다진 재료를 넣고 충분히 끓여요.", "식힌 뒤 걸림·입자를 확인해요. 소금·간은 하지 않아요."], note: "새 재료는 한 번에 하나씩, 소량으로 시작해 2~3일 이상 관찰하는 흐름이 도움이 돼요." },
    { title: "소고기 감자죽", months: "7개월+", tags: ["beef", "potato", "rice"], ing: "쇠고기(다짐), 감자(익힌), 쌀, 물", steps: ["감자는 푹 익혀 으깨고, 쇠고기는 완전히 익혀 잘게 다져요. 감자가 처음이면 3~4일, 소량으로 시작해요.", "쌀죽에 넣고 한 번 더 끓여요.", "덩어리가 남지 않게 섞은 뒤 식혀서 아이에게 맞는 질감인지 확인해요."], note: "질감(미음·죽·진밥) 단계는 아이 상태와 의료진 안내를 우선으로 봐 주세요." },
    { title: "소고기 브로콜리죽", months: "7개월+", tags: ["beef", "broccoli", "rice"], ing: "쇠고기(다짐), 브로콜리(꽃), 쌀, 물", steps: ["브로콜리는 꽃 위주로 삶아 잘게 다져요. 쇠고기도 완전히 익혀 잘게 다져요. 브로콜리가 처음이면 3~4일, 소량으로 시작해요.", "쌀죽에 넣고 끓여 색과 질감을 확인해요.", "쓴맛이 느껴지면 쌀죽 비율로 조절해요. 간·당은 더하지 않아요."], note: "입자·섬유가 걸리면 더 잘게 다지고, 아이 반응을 먼저 봐 주세요." },
    { title: "소고기 애호박죽", months: "7개월+", tags: ["beef", "squash", "rice"], ing: "쇠고기(다짐), 애호박(익힌 다짐), 쌀, 물", steps: ["애호박은 씨를 정리해 익힌 뒤 잘게 다져요. 쇠고기도 완전히 익혀 잘게 다져요.", "쌀죽에 넣고 끓이며 너무 물러지지 않게 불 조절을 해요.", "식힌 뒤 잘 퍼지는지, 걸리는 입자가 없는지 확인해요."], note: "애호박이 처음이면 3~4일, 소량으로 시작해요. 불편한 증상이 있으면 의료기관 상담을 권장드려요." },
    { title: "소고기 두부죽", months: "8개월+ (콩·알레르기)", tags: ["beef", "tofu", "rice"], ing: "쇠고기(다짐), 두부(부드러운 것, 익혀 으깸), 쌀, 물", steps: ["콩·두부를 처음이면 쇠고기와 동시에 ‘새’로 넣지 말고, 한 가지씩 3~4일씩요.", "쌀죽에 쇠고기를 익힌 뒤 두부를 넣고 짧게 끓이며 부숩니다.", "식힌 뒤 질감을 봅니다. 소금·간은 넣지 말기."], note: "콩 알레르기와 소고기 알레르기는 따로 관찰하세요." },
    { title: "소고기 진밥", months: "9개월+ (질감·병원·가정)", tags: ["beef", "rice"], ing: "쇠고기(다짐), 쌀, 물(적게)", steps: ["쌀죽을 조금 더 걸쭉하게 끓여요. 단계는 아이의 씹는 힘에 맞춰 조절해요.", "쇠고기는 완전히 익혀 아주 잘게 다지고, 덩어리·질긴 결은 피하세요.", "삼킴·목·흡입 위험을 항상 살피고, 짜게 만들거나 튀기지 않아요."], note: "덩어리 단계로 넘어갈수록 반드시 아이 반응과 의료진 안내를 우선으로 봐 주세요." },
    { title: "소고기 당근죽", months: "7개월+", tags: ["beef", "carrot", "rice"], ing: "쇠고기(다짐), 당근(익힌), 쌀, 물", steps: ["당근은 익혀 잘게 다지고, 쇠고기도 완전히 익혀 잘게 다져요.", "쌀죽에 넣고 한 번 더 끓여요.", "주황색이 골고루 섞였는지, 섬유가 걸리지 않는지 확인해요."], note: "쇠고기와 당근을 동시에 ‘처음’으로 넣지 않는 편이 좋아요." },
    { title: "닭고기 미음", months: "7개월+", tags: ["chicken", "rice"], ing: "닭안심, 쌀(불린), 물", steps: ["닭은 기름을 정리해 완전히 익힌 뒤 찢거나 잘게 다져요. 닭이 처음이면 3~4일, 소량으로 시작해요.", "쌀미음에 넣고 짧게 한 번 더 끓여요.", "튀김·소스·날것은 피하는 편이 좋아요."], note: "설사·발진·호흡 변화 등 불편한 반응이 있으면 의료기관 상담을 권장드려요." },
    { title: "닭고기 단호박죽", months: "7개월+", tags: ["chicken", "sweetpotato", "rice"], ing: "닭안심, 단호박(찐), 쌀, 물", steps: ["단호박은 씨를 정리해 찐 뒤 으깨요. 닭은 완전히 익혀 잘게 다져요. 처음인 재료가 있다면 3~4일 간격으로 따로 시작해요.", "쌀죽에 넣고 잘 섞이게 끓여요.", "너무 달게 느껴지면 쌀·물 비율로 조절해요. 설탕·꿀은 넣지 않아요."], note: "닭과 단호박을 동시에 ‘처음’으로 시작하지 않는 편이 좋아요." },
    { title: "닭고기 감자죽", months: "7개월+", tags: ["chicken", "potato", "rice"], ing: "닭안심, 감자(익힌), 쌀, 물", steps: ["감자는 푹 익혀 으깨고, 닭은 익혀 잘게 다져요. 첫 도입이면 감자와 닭을 하루에 동시 ‘새’로 넣지 말기.", "쌀죽에 넣고 끓이며 눌붙지 않게 저어요.", "식힌 뒤 질·덩어리를 봅니다. 기름·튀김·간은 쓰지 말기."], note: "흡입·목·소화, 알레르기는 소아과·가정이 기준이에요." },
    { title: "닭고기 야채죽(당·애)", months: "7개월+", tags: ["chicken", "carrot", "squash", "rice"], ing: "닭안심, 당근, 애호박(익힌), 쌀, 물", steps: ["채소·닭이 모두 익혀 다진 뒤, ‘새’는 하루 한 가지씩 쌓는 방식이 안전해요.", "쌀죽이 끓기 시작하면 다진 재료를 넣고 끓입니다.", "색·질·습기를 봅니다. 한 번에 여러 미지의 재료를 섞지 말기."], note: "집·병원·알레르기·월령이 먼저입니다." },
    { title: "닭고기 애호박죽", months: "7개월+", tags: ["chicken", "squash", "rice"], ing: "닭안심, 애호박(익힌), 쌀, 물", steps: ["닭과 애호박은 완전히 익힌 뒤 잘게 다져요. 애호박이 처음이면 3~4일, 소량으로 시작해요.", "쌀죽에 넣고 한 번 더 끓여요.", "씨·껍질을 확인하고, 덩어리가 남지 않게 섞어 주세요."], note: "익힌 재료만 사용하고, 날것·튀김·소스는 피하는 편이 좋아요." },
    { title: "닭고기 브로콜리죽", months: "7개월+", tags: ["chicken", "broccoli", "rice"], ing: "닭안심, 브로콜리(꽃), 쌀, 물", steps: ["브로콜리 꽃만 삶아 잘게, 닭은 익혀 잘게 다져요. 브로콜리 첫이면 3~4일, 소량.", "쌀죽에 넣고 끓입니다.", "쓴 맛, 입자(섬유)를 봅니다."], note: "꽃가루·알레르기 민감은 병원·가정." },
    { title: "순두부 쌀죽", months: "8개월+ (콩)", tags: ["tofu", "rice"], ing: "순두부, 쌀, 물", steps: ["순두부는 첫이면 3~4일, 소량. 콩 알레르기·가정·소아과를 따르세요.", "쌀죽 끓기 끝에 넣고 짧게, 부서지게 끓입니다.", "비릿함·끈(부드러움)을 봅니다. 짜고 찐 순두부는 가정에 맡기기."], note: "콩(두부)을 다른 ‘새’ 단백과 하루에 겹쳐 넣지 말기." },
    { title: "애호박 두부죽", months: "8개월+", tags: ["tofu", "squash", "rice"], ing: "두부, 애호박(익힌), 쌀, 물", steps: ["애호박·두부가 모두 처음이라면 하루에 한 가지씩, 3~4일 간격으로 시작해요.", "쌀죽에 넣고 끓여요.", "퍼짐·질감·덩어리 여부를 확인해요."], note: "콩(두부)·채소 반응은 따로 관찰하는 편이 좋아요." },
    { title: "당근 두부죽", months: "8개월+", tags: ["tofu", "carrot", "rice"], ing: "두부, 당근(익힌), 쌀, 물", steps: ["당근·두부 익혀 잘게, 첫이면 먼저 한 가지씩 3~4일씩.", "쌀죽에 넣고 끓입니다.", "주황색·쌀, 질을 봅니다."], note: "꿀·잼(당)으로 맛을 올리지 말기." },
    { title: "브로콜리 두부죽", months: "8개월+", tags: ["tofu", "broccoli", "rice"], ing: "두부, 브로콜리(꽃), 쌀, 물", steps: ["브로콜리 꽃만 삶아 잘게, 두부는 익혀 으깹니다. ‘새’는 하루 한 가지.", "쌀죽에 넣고 끓입니다.", "쓴 맛, 퍼짐, 입자(섬유)를 봅니다."], note: "콩·채소 동시 ‘처음’ 금지." },
    { title: "감자 미음", months: "6~7개월+", tags: ["potato", "rice"], ing: "감자(익힌), 쌀, 물", steps: ["감자 푹 익혀 푸석하게. 첫이면 3~4일, 소량.", "쌀미음(묽)에 넣고 끓이며 잘 풀듯 섞어요.", "덩·질(미음·죽)은 병원·가정에 맡기기. 소금·간·튀김·날 것은 쓰지 말기."], note: "초록 부분(싹·잎)은 쓰지 말기. 꼭 익힌 것만." },
    { title: "감자 당근죽", months: "7개월+", tags: ["potato", "carrot", "rice"], ing: "감자(익힌), 당근(익힌), 쌀, 물", steps: ["감자·당근 익혀 잘게. ‘새’는 하루 한 가지씩 3~4일씩.", "쌀죽에 넣고 끓입니다.", "주황·흰색이 섞이고, 덩이 남지 않는지 봅니다."], note: "한 번에 여러 ‘처음’ 재료를 넣지 말기." },
    { title: "감자 애호박죽", months: "7개월+", tags: ["potato", "squash", "rice"], ing: "감자(익힌), 애호박(익힌), 쌀, 물", steps: ["감자·애호박은 익힌 뒤 잘게 다져요. 처음이라면 한 가지씩 순서대로 시작해요.", "쌀죽에 넣고 끓여요.", "씨·껍질을 확인하고 덩어리가 남지 않게 섞어 주세요."], note: "흡입·목 걸림이 걱정되면 더 곱게 다지고, 의료진 안내를 우선으로 봐 주세요." },
    { title: "감자 브로콜리죽", months: "7개월+", tags: ["potato", "broccoli", "rice"], ing: "감자(익힌), 브로콜리(꽃), 쌀, 물", steps: ["브로콜리 꽃만 삶아 잘게, 감자는 으깹니다.", "쌀죽에 넣고 끓입니다.", "쓴 맛·섬유를 봅니다."], note: "브로콜리 첫이면 3~4일, 소량." },
    { title: "감자 단호박(밤)죽", months: "7개월+", tags: ["potato", "sweetpotato", "rice"], ing: "감자(익힌), 단호박(찐), 쌀, 물", steps: ["단호박·감자 익혀 잘게. ‘새’는 따로따로 3~4일씩이 안전.", "쌀죽에 넣고 끓입니다.", "너무 달면 쌀·물로 희석. 꿀·잼은 넣지 말기."], note: "담백·당은 소아·가정이 기준." },
    { title: "고구마 미음", months: "6~7개월+", tags: ["sweetpotato", "rice"], ing: "고구마(찐), 쌀, 물", steps: ["고구마 씨·껍질 정리 후 잘 익혀 푸석하게. 첫이면 3~4일, 소량.", "쌀미음에 넣고 끓이며 퍼지게 섞어요.", "너무 달면 쌀죽 비율로 맞춥니다. 꿀·잼(당)은 넣지 말기."], note: "속이 예민, 설사, 입 주변이 심하면 가정·병원과 상담." },
    { title: "고구마 바나나죽", months: "7개월+", tags: ["sweetpotato", "banana", "rice"], ing: "고구마(찐), 잘 익은 바나나(다짐), 쌀, 물", steps: ["고구마·바나나를 동시 ‘처음’이면 하루엔 한 가지씩. 둘 다 익혀·다짐.", "쌀죽에 넣고 끓입니다.", "질(너무 달지 않게) 쌀·물로 맞춤."], note: "한 번에 여러 ‘새’를 넣지 말기. 바나나 알레르기는 드물지만 관찰." },
    { title: "고구마 두유죽", months: "12개월+ (콩·가정·소아과)", tags: ["sweetpotato", "rice"], ing: "고구마(찐), 콩이 들어간 두유(무가당·짠 맛 적은), 쌀, 물", steps: ["두유는 집·소아·알레르기(콩) 안내 먼저. 첫이면 3~4일, 소량.", "고구마·쌀죽 끓인 끝에 두유를 넣고 짧게, 끓이기만 하고 끄기(끊임·끈 주의).", "식혀 퍼짐·냄새를 봅니다."], note: "두유·콩은 12개월 전후, 집·병원·소아과 기준. 익힌 식만, 튀김·날 것은 쓰지 말기." },
    { title: "고구마 사과죽", months: "7개월+", tags: ["sweetpotato", "apple", "rice"], ing: "고구마(찐), 사과(익힌 다짐), 쌀, 물", steps: ["둘 중 첫이면 한 가지씩 3~4일씩. 둘 다 익혀 잘게.", "쌀죽에 넣고 끓입니다.", "잘 익힌 사과, 씨·껍질 정리, 입자(섬유)를 봅니다."], note: "꿀·잼(당)으로 맛을 올리지 말기." },
    { title: "고구마 쌀죽(담백)", months: "7개월+", tags: ["sweetpotato", "rice"], ing: "고구마(찐), 쌀, 물(조금)", steps: ["고구마·쌀죽을 끓여 걸쭉(죽)까지. 당은 가정·소아, 처음엔 담백 쪽이 편한 경우가 많아요.", "식혀 질(미음·죽)에 맡기기.", "과즙(당)만 늘리지 말기."], note: "꿀·엿·잼(당)만 올리지 말기. 한꺼번에 ‘새’ 당(과, 엿) X." },
    { title: "고구마 애호박죽", months: "7개월+", tags: ["sweetpotato", "squash", "rice"], ing: "고구마(찐), 애호박(익힌), 쌀, 물", steps: ["둘 다 익혀 잘게. ‘새’는 한 가지씩.", "쌀죽에 넣고 끓입니다.", "씨·껍질, 냄새(흙)에 유의."], note: "첫이면 3~4일, 소량." },
    { title: "브로콜리 미음", months: "7개월+", tags: ["broccoli", "rice"], ing: "브로콜리(꽃), 쌀, 물", steps: ["꽃만 삶아 잘게. 첫이면 3~4일, 소량.", "쌀미음에 넣고 끓입니다.", "쓴 맛, 섬유, 녹색을 봅니다. 소금·간·설탕은 넣지 말기."], note: "꽃가루, 알레르기 민감, 호흡, 피부 반응이 있으면 병원·가정." },
    { title: "브로콜리 당근죽", months: "7개월+", tags: ["broccoli", "carrot", "rice"], ing: "브로콜리(꽃), 당근(익힌), 쌀, 물", steps: ["둘 다 익혀 잘게. ‘새’는 한 가지씩 3~4일씩.", "쌀죽에 넣고 끓입니다.", "쓴 맛(브로콜리)과 당근 색(주황)을 봅니다."], note: "한 번에 여러 ‘처음’ 금지." },
    { title: "브로콜리 쌀죽(담백)", months: "7개월+", tags: ["broccoli", "rice"], ing: "브로콜리(꽃), 쌀, 물", steps: ["브로콜리는 꽃 위주로 삶아 잘게 다져요. 처음이면 3~4일, 소량으로 시작해요.", "쌀죽을 조금 덜 묽게 끓여요.", "익힌 재료만 쓰고, 튀김·기름·간을 더하지 않아요."], note: "꿀·잼·설탕으로 단맛만 올리는 방식은 피하는 편이 좋아요." },
    { title: "당근 미음", months: "6~7개월+", tags: ["carrot", "rice"], ing: "당근(익힌), 쌀, 물", steps: ["껍질을 닦고 푹 익혀 잘게. 첫이면 3~4일, 소량.", "쌀미음에 넣고 끓입니다.", "섬유, 주황색, 질(미음)을 봅니다. 걸림이 있으면 체·질을 맞춥니다."], note: "씨, 싹(초록), 껍(덜 익)은 쓰지 말기." },
    { title: "당근 애호박죽", months: "7개월+", tags: ["carrot", "squash", "rice"], ing: "당근, 애호박(익힌), 쌀, 물", steps: ["둘 다 익혀 잘게. ‘새’는 하루 한 가지씩.", "쌀죽에 넣고 끓입니다.", "씨·껍질(애호박), 냄새(흙)에 유의."], note: "한 번에 여러 ‘처음’을 넣지 말기." },
    { title: "당근 쌀죽(채소)", months: "7개월+", tags: ["carrot", "rice"], ing: "당근(익힌), 쌀, 물", steps: ["당근 익혀 잘게. 3~4일, 소량.", "쌀죽(죽)으로 끓입니다.", "주황색·쌀, 질(죽)을 봅니다."], note: "짜게·달게만(잼) 올리지 말기." },
    { title: "애호박 쌀죽(단)", months: "7개월+", tags: ["squash", "rice"], ing: "애호박(익힌), 쌀, 물", steps: ["씨·껍질을 정리하고 푹 익혀 잘게. 첫이면 3~4일, 소량.", "쌀죽에 넣고 끓입니다.", "냄새(흙), 질(너무 물러짐)을 봅니다."], note: "기름, 튀김, 소스는 쓰지 말기." },
    { title: "애호박 감자죽", months: "7개월+", tags: ["squash", "potato", "rice"], ing: "애호박(익힌), 감자(익힌), 쌀, 물", steps: ["둘 다 익혀 잘게. ‘새’는 한 가지씩 3~4일씩.", "쌀죽에 넣고 끓입니다.", "덩·냄새(흙)에 유의."], note: "흡입, 목, 소화(병원·가정) 먼저." },
    { title: "계란 노른자 쌀죽", months: "7개월+ (계란, 병원·가정)", tags: ["egg", "rice"], ing: "계란(노른자), 쌀, 물", steps: ["계란은 날 것, 반숙을 먹이지 말고, 노른자를 완전히 익혀 잘게 으깹니다. 첫이면 3~4일, 소량.", "쌀죽이 끓기 시작하면 넣고 짧게 저어 끓입니다.", "식혀 질·냄새(비린)을 봅니다. 흰자, 날 것, 반숙은 쓰지 말기."], note: "날 계란·반숙은 세균 위험. 소아·가정·알레르기(계란) 안내 먼저." },
    { title: "계란 당근 쌀죽", months: "8개월+", tags: ["egg", "carrot", "rice"], ing: "계란(노른자, 완전히 익힌), 당근(익힌), 쌀, 물", steps: ["둘 중 ‘새’면 하루 한 가지씩. 당근·노른자 완전 익혀 잘게.", "쌀죽에 넣고 끓입니다.", "걸림, 색, 질을 봅니다."], note: "계란과 당근을 동시에 ‘처음’에 넣지 말기." },
    { title: "바나나 쌀죽", months: "7개월+", tags: ["banana", "rice"], ing: "잘 익은 바나나(다짐), 쌀, 물", steps: ["바나나가 처음이면 3~4일, 소량으로 시작해요. 껍질과 질긴 심은 빼고 으깨요.", "쌀죽에 넣고 짧게 끓이며 섞어 주세요.", "너무 달게 느껴지면 쌀·물 비율로 조절해요. 꿀·잼은 넣지 않아요."], note: "처음엔 새 과일을 한 번에 여러 가지 섞지 않는 편이 좋아요." },
    { title: "바나나 감자죽", months: "7개월+", tags: ["banana", "potato", "rice"], ing: "바나나(다짐), 감자(익힌), 쌀, 물", steps: ["둘 중 처음인 재료가 있으면 한 가지씩 3~4일 간격으로 시작해요. 감자는 익혀 으깨고, 바나나는 잘 익은 것만 사용해요.", "쌀죽에 넣고 끓여요.", "덩어리가 남지 않는지, 단맛이 과하지 않은지 확인해요."], note: "꿀·잼 등으로 단맛을 더하지 않는 편이 좋아요." },
    { title: "사과 퓨레(죽에 섞기)", months: "6~7개월+", tags: ["apple", "rice"], ing: "사과(익혀 다진 것/퓨레), 쌀, 물", steps: ["사과는 씨·껍질·심을 정리해 잘 익힌 뒤 곱게 다져요. 처음이면 3~4일, 소량으로 시작해요.", "쌀미음·죽에 넣고 한 번 더 끓여요.", "신맛·섬유가 걸리지 않는지, 질감을 확인해요. 꿀·설탕은 넣지 않아요."], note: "사과가 ‘처음’이라면 다른 새 채소·과일과 겹치지 않게 시작해요." },
    { title: "사과 고구마 퓨레죽", months: "7개월+", tags: ["apple", "sweetpotato", "rice"], ing: "사과(익힌), 고구마(찐), 쌀, 물", steps: ["둘 중 첫이면 한 가지씩. 둘 다 익혀 잘게.", "쌀죽에 넣고 끓입니다.", "너무 달면 쌀·물로 맞춥니다."], note: "꿀·잼(당)으로 당만 올리지 말기." },
    { title: "사과 오트·죽(곡)", months: "8개월+ (곡·가정)", tags: ["apple", "rice"], ing: "사과(익힌), 오트(가루, 병원·가정), 쌀, 물", steps: ["오트·곡은 소아·가정·씹힘·질(미음~죽)에 맡기기. 사과·오트 ‘새’는 따로따로 3~4일씩.", "끓여 질(거침)을 맞춥니다. 사과 씨·껍질, 날것, 반숙(식)은 쓰지 말기."], note: "오트·곡 도입은 소아·가정, 곡(오트) 알레르기 안내 먼저. 익힌 식만, 튀김·날 것은 쓰지 말기." },
    { title: "연어 쌀죽", months: "8개월+ (생선, 병원·가정)", tags: ["salmon", "rice"], ing: "연어(살, 뼈·껍질 없이 익힌), 쌀, 물", steps: ["연어는 뼈, 작은 가시를 꼼꼼히 뺀 뒤, 완전히 익혀 잘게 다져요. 첫이면 3~4일, 소량.", "쌀죽이 끓기 시작하면 넣고 짧게 끓입니다.", "비린(개인차) 냄, 질(입자)을 봅니다. 날 연어, 훈제·짜게·기름(튀) X."], note: "알레르기(생선), 소아·가정. 익힌 것만, 날 것은 쓰지 말기." },
    { title: "연어 감자죽", months: "8개월+", tags: ["salmon", "potato", "rice"], ing: "연어(익힌), 감자(익힌), 쌀, 물", steps: ["둘 다 익혀. ‘새’는 하루 한 가지씩 3~4일씩.", "쌀죽에 넣고 끓입니다.", "가시(연어), 덩(감)에 유의."], note: "흡입, 목(가시) 막힘, 알레르기(생선)에 유의. 소아과·가정 먼저." },
    { title: "연어 브로콜리죽", months: "8개월+", tags: ["salmon", "broccoli", "rice"], ing: "연어(익힌), 브로콜리(꽃), 쌀, 물", steps: ["연어·브로콜리 ‘새’면 먼저 따로. 익혀 잘게.", "쌀죽에 넣고 끓입니다.", "쓴 맛, 냄새(비린), 섬유를 봅니다."], note: "한 번에 여러 ‘새’ 금지." },
    { title: "연어 애호박죽", months: "8개월+", tags: ["salmon", "squash", "rice"], ing: "연어(익힌), 애호박(익힌), 쌀, 물", steps: ["둘 다 익혀 잘게. ‘새’는 한 가지씩.", "쌀죽에 넣고 끓입니다.", "가시(연), 씨(호)에 유의."], note: "익힌 식만. 날것, 튀김(기름)은 쓰지 말기." },
    { title: "쌀미음(기본)", months: "6개월+ (집·병원·가정)", tags: ["rice"], ing: "쌀(불린), 물", steps: ["쌀에 물을 넣고 약한 불에 푹 끓여 묽은 미음을 만듭니다. 첫 이유(식) 흐름은 병원·가정에 맡기기.", "식혀, 덩·질(미음)을 봅니다. 소금, 간(첨가)은 넣지 말기. 탄 냄새가 나면 끄고, 새 냄비에 다시 끓이기."], note: "남은 것은 식혀 냉장에 보관하고, 하루 이내에 드세요. 데울 때는 아기가 먹기 좋은 온도로 맞춰 주세요." },
    { title: "쌀죽(당근)", months: "7개월+", tags: ["rice", "carrot"], ing: "쌀, 당근(익힌), 물", steps: ["당근 익혀 잘게. 3~4일, 소량.", "쌀죽(죽)에 넣고 끓입니다.", "주황(색)과 질(죽)을 봅니다."], note: "당근이 ‘새’면 다른 ‘새’와 겹치지 말기." },
    { title: "쌀죽(애호박)", months: "7개월+", tags: ["rice", "squash"], ing: "쌀, 애호박(익힌), 물", steps: ["애호박 씨·껍질 정리, 익혀 잘게. 3~4일, 소량.", "쌀죽에 넣고 끓입니다.", "냄새(흙), 질(너무 물러짐)에 유의."], note: "기름진 조리, 튀김, 소스는 쓰지 말기. 익힌 재료와 덩어리, 목·소아과 기준을 따르세요." },
    { title: "쌀죽(브로콜리)", months: "7개월+", tags: ["rice", "broccoli"], ing: "쌀, 브로콜리(꽃), 물", steps: ["꽃만 삶아 잘게. 3~4일, 소량.", "쌀죽에 넣고 끓입니다.", "쓴 맛, 섬유를 봅니다."], note: "쓴 맛·섬유, 꽃가루·알레르기, 호흡·피부 반응이 있으면 병원·가정에 말씀하세요." }
  ];

  function esc(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function buildCard(r) {
    var stepsHtml = r.steps
      .map(function (st, i) {
        return "<li>" + esc(st) + "</li>";
      })
      .join("");
    return (
      '<li class="recipe-card">' +
      '<div class="recipe-card__head">' +
      '<h3 class="recipe-card__title">' +
      esc(r.title) +
      "</h3>" +
      '<p class="recipe-card__meta"><span class="badge">추천 월령: ' +
      esc(r.months) +
      "</span></p></div>" +
      '<div class="recipe-card__body"><div class="recipe-card__cols"><div><h3>재료</h3><p style="margin:0;font-size:0.9rem;font-weight:500;color:var(--c-text-sub);line-height:1.6">' +
      esc(r.ing) +
      "</p></div><div><h3>만드는 순서</h3><ol>" +
      stepsHtml +
      "</ol></div></div>" +
      '<div class="recipe-note"><strong>주의</strong> ' +
      esc(r.note) +
      "</div></div></li>"
    );
  }

  var activeCat = "all";
  var searchEl = document.getElementById("rbfSearch");
  var listEl = document.getElementById("rbfList");
  var resultEl = document.getElementById("rbfResult");
  var barEl = document.getElementById("rbfCatBar");

  function matches(r, cat, q) {
    if (cat !== "all" && r.tags.indexOf(cat) === -1) return false;
    if (!q) return true;
    var blob = (r.title + " " + r.ing + " " + r.note + " " + r.steps.join(" ")).toLowerCase();
    return blob.indexOf(q) !== -1;
  }

  function render() {
    if (!listEl) return;
    var q = searchEl && searchEl.value ? searchEl.value.trim().toLowerCase() : "";
    var out = [];
    var i;
    for (i = 0; i < RECIPES.length; i++) {
      if (matches(RECIPES[i], activeCat, q)) {
        out.push(RECIPES[i]);
      }
    }
    listEl.style.opacity = "0.5";
    window.setTimeout(function () {
      listEl.innerHTML = out.map(buildCard).join("");
      listEl.style.opacity = "1";
      if (resultEl) {
        resultEl.textContent = "총 " + out.length + "개";
      }
    }, 60);
  }

  function setCat(id) {
    activeCat = id;
    if (barEl) {
      var btns = barEl.querySelectorAll(".rbf-cat-btn");
      var b;
      for (b = 0; b < btns.length; b++) {
        if (btns[b].getAttribute("data-cat") === id) {
          btns[b].classList.add("is-active");
        } else {
          btns[b].classList.remove("is-active");
        }
      }
    }
    render();
  }

  function buildBar() {
    if (!barEl) return;
    var h = [];
    var c;
    for (c = 0; c < CATS.length; c++) {
      h.push(
        '<button type="button" class="rbf-cat-btn' +
          (CATS[c].id === "all" ? " is-active" : "") +
          '" data-cat="' +
          esc(CATS[c].id) +
          '">' +
          esc(CATS[c].label) +
          "</button>"
      );
    }
    barEl.innerHTML = h.join("");
    var btns = barEl.querySelectorAll(".rbf-cat-btn");
    var b;
    for (b = 0; b < btns.length; b++) {
      btns[b].addEventListener("click", function () {
        setCat(this.getAttribute("data-cat") || "all");
      });
    }
  }

  function init() {
    buildBar();
    if (searchEl) {
      searchEl.addEventListener("input", function () {
        render();
      });
    }
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

