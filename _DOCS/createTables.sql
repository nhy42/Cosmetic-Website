SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `site_cosmetique` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `site_cosmetique`;

DROP TABLE IF EXISTS `Buy`;
CREATE TABLE `Buy` (
  `Id_users` int NOT NULL,
  `Id_Products` int NOT NULL,
  `Id_Order` int NOT NULL,
  `quantity` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Buy` (`Id_users`, `Id_Products`, `Id_Order`, `quantity`) VALUES
(4, 1, 4, 1),
(4, 2, 4, 1),
(4, 3, 4, 1),
(4, 4, 5, 1),
(4, 5, 6, 1),
(4, 6, 6, 2),
(5, 1, 1, 2),
(5, 2, 3, 1),
(5, 7, 1, 1),
(5, 9, 1, 1),
(5, 10, 1, 2),
(5, 10, 2, 1);

DROP TABLE IF EXISTS `Category`;
CREATE TABLE `Category` (
  `Id_category` int NOT NULL,
  `category_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Category` (`Id_category`, `category_name`) VALUES
(1, 'Women'),
(2, 'Men');

DROP TABLE IF EXISTS `Products`;
CREATE TABLE `Products` (
  `Id_Products` int NOT NULL,
  `name_product` varchar(50) DEFAULT NULL,
  `product_price` decimal(15,2) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `vegan` int DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `Id_category` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Products` (`Id_Products`, `name_product`, `product_price`, `description`, `vegan`, `image`, `Id_category`) VALUES
(1, 'Dyed powder', 35.00, 'This sun powder warms, brightens the complexion and smoothes the skin texture. A light, soft and fine texture that lets the skin breathe.\r\nIdeal for a good-looking effect and a naturally unified and radiant complexion.\r\n\r\n3 shades of luminous bronzing powders in a generous case to naturally extend its tan.\r\n\r\n\r\nA formula enriched with 96% natural ingredients. The skin is protected from pollution.', 0, 'product1.jpg', 1),
(2, 'Lipstick', 15.00, 'It is first of all the promise of an ultra sensory melting stick that delivers from the first pass an explosive and bright color.\r\n\r\nNaturally present in the body, ceramides strengthen the skin barrier and protect the skin from water loss. With its care formula gorged with this active ingredient of natural origin, the satin red envelops the lips and allows hydration for 8 hours. The lips are soft, smoothed and more beautiful day after day.\r\n\r\nThe lipstick was made in France in a responsible way: it is made of 60% recycled plastic and does not contain ballast. Its formula is vegan because it does not contain ingredients of animal origin.', 1, 'product2.jpg', 1),
(3, 'Highlighter', 29.00, 'Like a second skin, this silky liquid highlighter leaves a soft and luminous finish with excellent hold.\r\n\r\nComposed of light-reflecting pearl particles and a mixture of plants such as lotus flower extract, gardenia fruit extract and white water lily root extract, this multidimensional formula illuminates the skin with a pearly glow in a few gestures. Mix this light liquid highlighter with your foundation or layer it over the areas of the face to highlight for an instant glow..', 1, 'product3.jpg', 1),
(4, 'Eyebrow pencil', 32.00, 'This ultra-fine mechanical pencil perfectly describes the eyebrows and fills the sparse or too waxed areas.\r\n\r\nThe retractable tip is neither too soft nor too firm and glides effortlessly to mimic natural hair and create an illusion of texture.', 1, 'product4.jpg', 1),
(5, 'Mascara', 12.00, 'Larger, more spectacular and sexier lashes thanks to the They’re Real!\r\n\r\nThe volume mascara They’re Real lengthens, separates, gives volume and curls lashes for a spectacular look! Its glossy black formula does not drip, does not move and does not dry out.\r\n\r\nA surprising mascara that offers a false-eyelash effect result. ', 0, 'product5.jpg', 1),
(6, 'Gloss', 32.00, 'This gloss brings an irresistible shine to your lips while nourishing them. It is available in six universal shades selected by Rnous itself as the ultimate finishing touch to any beauty look.\r\n\r\nIn one passage, the lips appear visibly fuller and smoother.', 1, 'product6.jpg', 1),
(7, 'Solar Cream', 29.99, 'A solar creme SP30 sunscreen that offers UVA and UVB protection from the sun’s harmful rays, thanks to its chemical UV filters.\r\nThis silky moisturizing formula contains an 8% hydrating trio of polyglutamic acid, glycerin and squalane. \r\nIt retains moisture for a smooth and vibrant finish. \r\n\r\nSuitable for all skin types and shades.', 0, 'product7.jpg', 2),
(8, 'Hand cream', 15.99, 'A deeply moisturizing hand cream with soothing vegetable milks that smoothes and protects dry hands, even after washing.\r\nThis soothing hand cream is enriched with centella, rice and flax seed vegetable milks that instantly soften hands while preventing dryness. \r\nIts formula has a creamy and comforting texture that softens hands and cuticles while providing hydration throughout the day, even after washing.\r\n\r\nThe little extra?\r\nThis Fresh product is composed of 97% of ingredients of natural origin.\r\n\r\nGOOD FOR YOU\r\nFormulas with at least 90% natural ingredients', 0, 'product8.jpg', 2),
(9, 'Shave gel + Face wash', 17.99, 'Discover our face cleanser for men that prepares the skin for shaving, softening both skin and hair.\r\n\r\nThis fresh gel provides effective cleansing for toned, fresh and shaving-ready skin. Enriched with a gentle, organic cleansing complex and derived marine plants, this facial cleanser leaves skin clean and revitalized. \r\n\r\nFor who?\r\nFor normal skin.\r\n\r\nThe little extra?\r\nTake advantage of the quality and expertise of Biotherm Homme, the world’s #1 premium men’s skincare brand.\r\n', 0, 'product9.jpg', 2),
(10, 'Shampoo', 19.99, 'A moisturizing shampoo, enriched with tiger grass and coconut to gently cleanse the hair and give it a silky and soft finish.\r\n\r\nIt is infused with essential Ayurvedic extracts to cleanse hair without drying it out.\r\n\r\n\r\nGOOD FOR VEGAN\r\nProducts without animal ingredients\r\n', 1, 'product10.jpg', 2),
(11, 'Hair conditionner', 19.99, 'A nourishing turmeric and coconut conditioner that helps detangle hair, tame frizz, leaving hair hydrated, easy to style and shiny.\r\n\r\nGOOD FOR VEGAN\r\nProducts without animal ingredients', 1, 'product11.jpg', 2),
(12, 'Peel-off mask', 29.99, 'A peel-off blackhead mask that cleanses and purifies. From the first use, it refines the skin texture. \r\nEasy to apply, this peel-off mask is placed on the T-zone of the face (forehead, nose, chin) to target black spots. \r\nIt dries in just 20 minutes and is easily removed. This is the essential for smoother and clearer skin.\r\n\r\nThe little extra?\r\nThis tube is made of 39% recycled plastic. The case comes from sustainably managed forests and is decorated with plant-based inks.\r\n\r\nGood For Vegan \r\nProducts without animal ingredients *Good for vegans\r\n\r\n', 1, 'product12.jpg', 2);

DROP TABLE IF EXISTS `Review`;
CREATE TABLE `Review` (
  `Id_review` int NOT NULL,
  `product_quality` int DEFAULT NULL,
  `delivery_quality` int DEFAULT NULL,
  `delivery_speed` int DEFAULT NULL,
  `customer_service` int DEFAULT NULL,
  `recommendation` int DEFAULT NULL,
  `Id_users` int NOT NULL,
  `Id_Order` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Review` (`Id_review`, `product_quality`, `delivery_quality`, `delivery_speed`, `customer_service`, `recommendation`, `Id_users`, `Id_Order`) VALUES
(1, 4, 5, 4, 5, 3, 5, 1),
(3, 1, 1, 1, 2, 1, 5, 2),
(4, 5, 5, 5, 5, 5, 4, 4),
(5, 2, 4, 3, 5, 2, 4, 5),
(6, 4, 5, 3, 5, 4, 4, 6);

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `Id_users` int NOT NULL,
  `mail` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `gender` int DEFAULT NULL,
  `user_type` varchar(10) DEFAULT 'customer',
  `date_of_birth` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Users` (`Id_users`, `mail`, `lastname`, `firstname`, `password`, `gender`, `user_type`, `date_of_birth`) VALUES
(1, 'admin', 'Adminus', 'Maximus', '$2b$10$oX2SqCXhUOOxVUY32LKWD.WpLWZbtNxe/FiGhB9kfUXdjQvCrpRA.', 1, 'admin', '2000-01-01'),
(2, 'noa@efrei.net', 'IHateYou', 'Noa', '$2b$10$thqh5BksZce1FZuQMOHXAuoO2SKoT6fBgC3q9sbCPBStJYEEGB33e', 1, 'admin', '2003-10-15'),
(3, 'lea@efrei.net', 'Varing', 'Lea', '$2b$10$8zJIp4W0qng3JxQoYysTReAvlsP.pJOJ8WMsMHaILHjBIka0iuGCi', 1, 'admin', '2003-10-17'),
(4, 'customer', 'customer', 'customer', '$2b$10$8e.9Ac3i.GkaJ99PacHNnuKfDS.dAnH8gwkO1yYfuW/NSHa98lpwq', 2, 'customer', '2002-01-01'),
(5, 'customer2', 'customer2', 'customer2', '$2b$10$D0QbEUfS2KfwHo92H.qzSOCDf4hY1DE8qSSDTruWltguZ7i78JUqy', 2, 'customer', '2000-01-01');

DROP TABLE IF EXISTS `Website_Order`;
CREATE TABLE `Website_Order` (
  `Id_Order` int NOT NULL,
  `date_order` datetime DEFAULT NULL,
  `delivery_adress` varchar(100) DEFAULT NULL,
  `total_price` decimal(15,2) DEFAULT NULL,
  `rememember_card` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Website_Order` (`Id_Order`, `date_order`, `delivery_adress`, `total_price`, `rememember_card`) VALUES
(1, '2023-12-14 22:33:20', 'Default Address', NULL, 0),
(2, '2023-12-14 22:33:50', 'Default Address', NULL, 0),
(3, '2023-12-14 22:33:56', 'Default Address', NULL, 0),
(4, '2023-12-14 22:40:04', 'Default Address', NULL, 0),
(5, '2023-12-14 22:40:11', 'Default Address', NULL, 0),
(6, '2023-12-14 22:40:22', 'Default Address', NULL, 0);

DROP TABLE IF EXISTS `Wish`;
CREATE TABLE `Wish` (
  `Id_users` int NOT NULL,
  `Id_Products` int NOT NULL,
  `quantity` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Wish` (`Id_users`, `Id_Products`, `quantity`) VALUES
(5, 9, 153);


ALTER TABLE `Buy`
  ADD PRIMARY KEY (`Id_users`,`Id_Products`,`Id_Order`),
  ADD KEY `Id_Products` (`Id_Products`),
  ADD KEY `Id_Order` (`Id_Order`);

ALTER TABLE `Category`
  ADD PRIMARY KEY (`Id_category`);

ALTER TABLE `Products`
  ADD PRIMARY KEY (`Id_Products`),
  ADD KEY `Id_category` (`Id_category`);

ALTER TABLE `Review`
  ADD PRIMARY KEY (`Id_review`),
  ADD UNIQUE KEY `Id_Order` (`Id_Order`),
  ADD KEY `Id_users` (`Id_users`) USING BTREE;

ALTER TABLE `Users`
  ADD PRIMARY KEY (`Id_users`),
  ADD UNIQUE KEY `mail` (`mail`);

ALTER TABLE `Website_Order`
  ADD PRIMARY KEY (`Id_Order`);

ALTER TABLE `Wish`
  ADD PRIMARY KEY (`Id_users`,`Id_Products`),
  ADD KEY `Id_Products` (`Id_Products`);


ALTER TABLE `Category`
  MODIFY `Id_category` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `Products`
  MODIFY `Id_Products` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

ALTER TABLE `Review`
  MODIFY `Id_review` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `Users`
  MODIFY `Id_users` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `Website_Order`
  MODIFY `Id_Order` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;


ALTER TABLE `Buy`
  ADD CONSTRAINT `Buy_ibfk_1` FOREIGN KEY (`Id_users`) REFERENCES `Users` (`Id_users`),
  ADD CONSTRAINT `Buy_ibfk_2` FOREIGN KEY (`Id_Products`) REFERENCES `Products` (`Id_Products`),
  ADD CONSTRAINT `Buy_ibfk_3` FOREIGN KEY (`Id_Order`) REFERENCES `Website_Order` (`Id_Order`);

ALTER TABLE `Products`
  ADD CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`Id_category`) REFERENCES `Category` (`Id_category`);

ALTER TABLE `Review`
  ADD CONSTRAINT `Review_ibfk_1` FOREIGN KEY (`Id_users`) REFERENCES `Users` (`Id_users`),
  ADD CONSTRAINT `Review_ibfk_2` FOREIGN KEY (`Id_Order`) REFERENCES `Website_Order` (`Id_Order`);

ALTER TABLE `Wish`
  ADD CONSTRAINT `Wish_ibfk_1` FOREIGN KEY (`Id_users`) REFERENCES `Users` (`Id_users`),
  ADD CONSTRAINT `Wish_ibfk_2` FOREIGN KEY (`Id_Products`) REFERENCES `Products` (`Id_Products`);
COMMIT;