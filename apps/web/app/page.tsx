import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

type IconProps = React.SVGProps<SVGSVGElement>;

const HomeIcon = ({ className, ...props }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 11L12 4l9 7" />
    <path d="M6 10v10h5v-5h2v5h5V10" />
  </svg>
);

const DownloadIcon = ({ className, ...props }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 4v11" />
    <path d="m7.5 11.5 4.5 4.5 4.5-4.5" />
    <path d="M5 20h14" />
  </svg>
);

const InfoIcon = ({ className, ...props }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5" />
    <path d="M12 8h.01" />
  </svg>
);

const LeafIcon = ({ className, ...props }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19 5c0 9-6 15-14 15 0-8 6-15 14-15Z" />
    <path d="M7 19c0-4.5 3.5-8 8.5-9.5" />
  </svg>
);

const FlameIcon = ({ className, ...props }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3c2 3 3 4.4 3 6.2a3 3 0 0 1-6 0c0-1.2.4-2.3 1-3.2" />
    <path d="M9 13a4.5 4.5 0 0 0 6 4.2" />
  </svg>
);

const SparkIcon = ({ className, ...props }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m12 3 .7 3.3L16 8l-3.3 1.7L12 13l-.7-3.3L8 8l3.3-1.7Z" />
    <path d="m6 14 .4 1.8L8 17l-1.6.8L6 20l-.4-2.2L4 17l1.6-.2Z" />
    <path d="m18 12 .5 2.2L21 15l-2.5.8L18 18l-.5-2.2L15 15l2.5-.8Z" />
  </svg>
);

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

const FOOD_ITEMS = [
  {
    name: "Yến mạch matcha năng lượng",
    description:
      "Bữa sáng giàu chất xơ với matcha, yến mạch cán dẹt và hạt chia giúp duy trì năng lượng bền bỉ.",
    calories: 320,
    protein: "14g protein",
    carbs: "45g carb sạch",
    fats: "9g chất béo tốt",
    tag: "Khởi động ngày mới",
  },
  {
    name: "Taco đậu đen phục hồi",
    description:
      "Kết hợp đậu đen, bơ và salsa xoài, cung cấp chất chống oxy hóa sau buổi tập cường độ cao.",
    calories: 410,
    protein: "18g protein",
    carbs: "48g carb phức",
    fats: "14g chất béo tốt",
    tag: "Sau buổi tập",
  },
  {
    name: "Sinh tố maca – cacao",
    description:
      "Sinh tố hương cacao với chuối đông lạnh, bơ hạnh nhân và maca hỗ trợ phục hồi hệ thần kinh.",
    calories: 360,
    protein: "20g protein",
    carbs: "38g carb",
    fats: "12g chất béo tốt",
    tag: "Tăng sức bền",
  },
  {
    name: "Salad đậu gà Địa Trung Hải",
    description:
      "Đậu gà, dưa leo, oliu và rau mầm, phủ sốt tahini giàu canxi giúp tối ưu hóa cơ bắp.",
    calories: 290,
    protein: "16g protein",
    carbs: "32g carb",
    fats: "10g chất béo tốt",
    tag: "Giờ nghỉ trưa",
  },
  {
    name: "Bowl gạo lứt tempeh",
    description:
      "Tempeh ướp xì dầu, gạo lứt và kim chi men vi sinh hỗ trợ tiêu hóa trước giờ thi đấu.",
    calories: 430,
    protein: "24g protein",
    carbs: "50g carb phức",
    fats: "15g chất béo tốt",
    tag: "Trước thi đấu",
  },
  {
    name: "Thanh protein bí đỏ",
    description:
      "Thanh protein tự làm từ bí đỏ, yến mạch và hạt lanh – nhỏ gọn nhưng nạp đủ dinh dưỡng.",
    calories: 270,
    protein: "17g protein",
    carbs: "28g carb",
    fats: "8g chất béo tốt",
    tag: "Snack thông minh",
  },
];

export default function Home() {
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
              <Button appName="web" className={styles.ctaButton}>
                Khám phá ngay
              </Button>
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
              Lựa chọn được chuyên gia dinh dưỡng thể thao đề xuất, cân bằng
              giữa năng lượng và phục hồi cho mọi giai đoạn tập luyện.
            </p>
          </div>
          <div className={styles.foodGrid}>
            {FOOD_ITEMS.map((item) => (
              <article className={styles.foodCard} key={item.name}>
                <div className={styles.foodMeta}>
                  <LeafIcon className={styles.foodIcon} />
                  <span className={styles.foodTag}>{item.tag}</span>
                </div>
                <h3>{item.name}</h3>
                <p className={styles.foodDescription}>{item.description}</p>
                <dl className={styles.foodStats}>
                  <div>
                    <dt>
                      <FlameIcon className={styles.statIcon} />
                      Năng lượng
                    </dt>
                    <dd>{item.calories} kcal</dd>
                  </div>
                  <div>
                    <dt>
                      <SparkIcon className={styles.statIcon} />
                      Protein
                    </dt>
                    <dd>{item.protein}</dd>
                  </div>
                  <div>
                    <dt>
                      <SparkIcon className={styles.statIcon} />
                      Carb
                    </dt>
                    <dd>{item.carbs}</dd>
                  </div>
                  <div>
                    <dt>
                      <SparkIcon className={styles.statIcon} />
                      Chất béo
                    </dt>
                    <dd>{item.fats}</dd>
                  </div>
                </dl>
              </article>
            ))}
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
