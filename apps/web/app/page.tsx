//import { Button } from "@repo/ui/button";
import { type ComponentType } from "react";
import { getFeaturedFoods, type FoodSummary } from "../lib/foods";
import {
  HomeIcon,
  DownloadIcon,
  InfoIcon,
  LeafIcon,
  FlameIcon,
  SparkIcon,
  type IconProps,
} from "./components/icons";
import styles from "./page.module.css";

const NAV_ITEMS = [
  {
    label: "Toàn thư",
    href: "#home",
    Icon: HomeIcon,
  },
  {
    label: "Tải xuống ứng dụng",
    href: "#download",
    Icon: DownloadIcon,
  },
  {
    label: "Về chúng tôi",
    href: "#about",
    Icon: InfoIcon,
  },
];

type FoodCard = FoodSummary & {
  tag: string;
  description: string;
};

type FoodStat = {
  label: string;
  value: string;
  Icon: ComponentType<IconProps>;
};

export default async function Home() {
  const foods = await getFeaturedFoods(8);
  const foodCards = foods.map(enrichFood);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <LeafIcon className={styles.brandIcon} />
          <div>
            <p className={styles.brandTitle}>Athletic Nutritions</p>
            <p className={styles.brandSubtitle}>Fuel your vegan performance</p>
          </div>
        </div>
        <nav aria-label="Điều hướng chính">
          <ul className={styles.navList}>
            {NAV_ITEMS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a className={styles.navLink} href={href}>
                  <Icon className={styles.navIcon} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero} id="home">
          <div className={styles.heroContent}>
            <span className={styles.heroTag}>
              Chương trình dinh dưỡng thuần chay
            </span>
            <h1 className={styles.heroTitle}>
              Nạp năng lượng sạch, dẫn đầu đường chạy
            </h1>
            <p className={styles.heroDescription}>
              Bộ sưu tập công thức và thực phẩm thuần chay được thiết kế riêng
              cho vận động viên, tối ưu hoá sức bền, phục hồi và tinh thần thi
              đấu.
            </p>
            <div className={styles.heroActions}>
              <a href="/foods" className={styles.ctaButton}>
                Khám phá ngay
              </a>
              <a className={styles.secondaryAction} href="#download">
                Xem cách tải ứng dụng
              </a>
            </div>
          </div>
          <div className={styles.heroHighlight}>
            <div className={styles.highlightItem}>
              <FlameIcon className={styles.highlightIcon} />
              <p>
                <strong>2000+</strong> kcal theo dõi mỗi ngày
              </p>
            </div>
            <div className={styles.highlightItem}>
              <SparkIcon className={styles.highlightIcon} />
              <p>
                <strong>120</strong> công thức thuần chay
              </p>
            </div>
          </div>
        </section>

        <section
          className={styles.foodSection}
          aria-labelledby="food-section-title"
        >
          <div className={styles.foodIntro}>
            <h2 id="food-section-title">Danh sách thực phẩm tiêu biểu</h2>
            <p>
              Dữ liệu được đồng bộ trực tiếp từ cơ sở dữ liệu dinh dưỡng công
              khai, giúp bạn theo dõi nhanh thành phần dinh dưỡng cho từng khẩu
              phần.
            </p>
          </div>
          <div className={styles.foodGrid}>
            {foodCards.length > 0 ? (
              foodCards.map((item) => {
                const stats = buildStats(item);
                return (
                  <article className={styles.foodCard} key={item.id}>
                    <div className={styles.foodMeta}>
                      <LeafIcon className={styles.foodIcon} />
                      <span className={styles.foodTag}>{item.tag}</span>
                    </div>
                    <h3>{item.name}</h3>
                    <p className={styles.foodDescription}>{item.description}</p>
                    <div className={styles.foodStats}>
                      {stats.map(({ label, value, Icon }) => (
                        <div key={label}>
                          <div>
                            <Icon className={styles.statIcon} />
                            {label}
                          </div>
                          <div>{value}</div>
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })
            ) : (
              <p className={styles.foodEmptyState}>
                Dữ liệu đang được đồng bộ từ kho dinh dưỡng.
              </p>
            )}
          </div>
        </section>

        <section className={styles.downloadSection} id="download">
          <h2>Tải xuống ứng dụng</h2>
          <p>
            Theo dõi khẩu phần, ghi log buổi tập và nhận nhắc nhở dinh dưỡng cá
            nhân hóa ngay trên thiết bị di động của bạn.
          </p>
          <div className={styles.downloadActions}>
            <a href="https://apps.apple.com" className={styles.storeBadge}>
              <DownloadIcon className={styles.storeIcon} />
              App Store
            </a>
            <a href="https://play.google.com" className={styles.storeBadge}>
              <DownloadIcon className={styles.storeIcon} />
              Google Play
            </a>
          </div>
        </section>

        <section className={styles.aboutSection} id="about">
          <h2>Về chúng tôi</h2>
          <p>
            Athletic Nutritions là đội ngũ chuyên gia dinh dưỡng thuần chay đồng
            hành cùng vận động viên chuyên nghiệp. Chúng tôi tích hợp khoa học
            dinh dưỡng, kinh nghiệm thi đấu và hương vị bản địa để tạo nên hành
            trình bền vững cho bạn.
          </p>
        </section>
      </main>
    </div>
  );
}

function enrichFood(food: FoodSummary): FoodCard {
  return {
    ...food,
    tag: buildTag(food),
    description: buildDescription(food),
  };
}

function buildStats(food: FoodSummary): FoodStat[] {
  return [
    {
      label: "Năng lượng",
      value: formatStat(food.energyKcal, "kcal"),
      Icon: FlameIcon,
    },
    {
      label: "Protein",
      value: formatStat(food.proteinGrams, "g"),
      Icon: SparkIcon,
    },
    {
      label: "Carb",
      value: formatStat(food.carbsGrams, "g"),
      Icon: SparkIcon,
    },
    {
      label: "Chất béo",
      value: formatStat(food.fatGrams, "g"),
      Icon: SparkIcon,
    },
    {
      label: "Chất xơ",
      value: formatStat(food.fiberGrams, "g"),
      Icon: LeafIcon,
    },
  ];
}

function buildTag(food: FoodSummary): string {
  if (food.proteinGrams !== null && food.proteinGrams >= 18) {
    return "Phục hồi cơ bắp";
  }

  if (food.carbsGrams !== null && food.carbsGrams >= 45) {
    return "Nạp năng lượng";
  }

  if (food.fiberGrams !== null && food.fiberGrams >= 5) {
    return "Giàu chất xơ";
  }

  if (food.fatGrams !== null && food.fatGrams <= 5) {
    return "Nhẹ bụng";
  }

  return "Cân bằng mỗi ngày";
}

function buildDescription(food: FoodSummary): string {
  const label =
    food.englishName && food.englishName !== food.name
      ? `Tên quốc tế: ${food.englishName}.`
      : "Nguồn thực phẩm bản địa.";

  const metrics: string[] = [];

  if (food.energyKcal !== null) {
    metrics.push(`${formatNumber(food.energyKcal, 0)} kcal`);
  }

  if (food.proteinGrams !== null) {
    metrics.push(`${formatNumber(food.proteinGrams, 1)}g protein`);
  }

  if (food.carbsGrams !== null) {
    metrics.push(`${formatNumber(food.carbsGrams, 1)}g carb`);
  }

  if (metrics.length > 2) {
    metrics.splice(2);
  }

  const highlight = metrics.length
    ? `Cung cấp ${metrics.join(", ")} cho mỗi 100g.`
    : "Thông tin dinh dưỡng đang được cập nhật.";

  return `${label} ${highlight}`;
}

function formatStat(value: number | null, unit: string): string {
  if (value === null) {
    return "Đang cập nhật";
  }

  return `${formatNumber(value, unit === "kcal" ? 0 : 1)} ${unit}`;
}

function formatNumber(value: number, decimals: number): string {
  return value.toLocaleString("vi-VN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
