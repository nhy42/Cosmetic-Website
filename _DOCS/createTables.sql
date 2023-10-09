SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `site_cosmetique` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `site_cosmetique`;

CREATE TABLE `Buy` (
  `Id_users` int NOT NULL,
  `Id_Products` int NOT NULL,
  `Id_Order` int NOT NULL,
  `quantity` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Category` (
  `Id_category` int NOT NULL,
  `category_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Category` (`Id_category`, `category_name`) VALUES
(1, 'Women'),
(2, 'Men');

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
(1, 'Dyed powder', 35.00, 'This sun powder warms, brightens the complexion and smoothes the skin texture. A light, soft and fine texture that lets the skin breathe.\r\nIdeal for a good-looking effect and a naturally unified and radiant complexion.\r\n\r\n3 shades of luminous bronzing powders in a generous case to naturally extend its tan.\r\n\r\n\r\nA formula enriched with 96% natural ingredients. The skin is protected from pollution.', 0, NULL, 1),
(2, 'Lipstick', 15.00, 'It is first of all the promise of an ultra sensory melting stick that delivers from the first pass an explosive and bright color.\r\n\r\nNaturally present in the body, ceramides strengthen the skin barrier and protect the skin from water loss. With its care formula gorged with this active ingredient of natural origin, the satin red envelops the lips and allows hydration for 8 hours. The lips are soft, smoothed and more beautiful day after day.\r\n\r\nThe lipstick was made in France in a responsible way: it is made of 60% recycled plastic and does not contain ballast. Its formula is vegan because it does not contain ingredients of animal origin.', 1, NULL, 1),
(3, 'Highlighter', 29.00, 'Like a second skin, this silky liquid highlighter leaves a soft and luminous finish with excellent hold.\r\n\r\nComposed of light-reflecting pearl particles and a mixture of plants such as lotus flower extract, gardenia fruit extract and white water lily root extract, this multidimensional formula illuminates the skin with a pearly glow in a few gestures. Mix this light liquid highlighter with your foundation or layer it over the areas of the face to highlight for an instant glow..', 1, NULL, 1),
(4, 'Eyebrow pencil', 32.00, 'This ultra-fine mechanical pencil perfectly describes the eyebrows and fills the sparse or too waxed areas.\r\n\r\nThe retractable tip is neither too soft nor too firm and glides effortlessly to mimic natural hair and create an illusion of texture.', 1, NULL, 1),
(5, 'Mascara', 12.00, 'Larger, more spectacular and sexier lashes thanks to the They’re Real!\r\n\r\nThe volume mascara They’re Real lengthens, separates, gives volume and curls lashes for a spectacular look! Its glossy black formula does not drip, does not move and does not dry out.\r\n\r\nA surprising mascara that offers a false-eyelash effect result. ', 0, NULL, 1),
(6, 'Gloss', 32.00, 'This gloss brings an irresistible shine to your lips while nourishing them. It is available in six universal shades selected by Rnous itself as the ultimate finishing touch to any beauty look.\r\n\r\nIn one passage, the lips appear visibly fuller and smoother.', 1, NULL, 1);

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

CREATE TABLE `Users` (
  `Id_users` int NOT NULL,
  `mail` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `gender` int DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Website_Order` (
  `Id_Order` int NOT NULL,
  `date_order` datetime DEFAULT NULL,
  `delivery_adress` varchar(100) DEFAULT NULL,
  `total_price` decimal(15,2) DEFAULT NULL,
  `rememember_card` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Wish` (
  `Id_users` int NOT NULL,
  `Id_Products` int NOT NULL,
  `quantity` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


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
  ADD UNIQUE KEY `Id_users` (`Id_users`),
  ADD UNIQUE KEY `Id_Order` (`Id_Order`);

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
  MODIFY `Id_Products` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `Review`
  MODIFY `Id_review` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `Users`
  MODIFY `Id_users` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `Website_Order`
  MODIFY `Id_Order` int NOT NULL AUTO_INCREMENT;


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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
