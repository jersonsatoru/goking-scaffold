-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 30-Set-2020 às 23:43
-- Versão do servidor: 5.7.26
-- versão do PHP: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `starbem`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `address`
--

DROP TABLE IF EXISTS `address`;
CREATE TABLE IF NOT EXISTS `address` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `user_id_holder` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `profile` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `complement` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip` varchar(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `neighborhood` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `address`
--

INSERT INTO `address` (`id`, `uuid`, `created_at`, `created_id`, `user_id_holder`, `user_id`, `profile`, `street`, `number`, `complement`, `zip`, `neighborhood`, `city`, `state`, `country`, `updated_at`, `updated_id`, `status`) VALUES
(1, '2a0fdc06-5484-4f98-91b7-79aeac494276', '2020-09-30 23:07:55', 6, 6, 6, 'Titular', 'Rua Artico', NULL, NULL, NULL, NULL, NULL, NULL, 'BR', NULL, NULL, 1),
(2, '4795e0ba-e68f-452a-9117-a9c4fb29b291', '2020-09-30 23:08:09', 6, 6, 1, 'Dependente', 'Rua Artico', NULL, NULL, NULL, NULL, NULL, NULL, 'BR', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `doctor_schedule`
--

DROP TABLE IF EXISTS `doctor_schedule`;
CREATE TABLE IF NOT EXISTS `doctor_schedule` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `day` varchar(50) DEFAULT NULL,
  `time` text,
  `updated_at` datetime DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `doctor_schedule`
--

INSERT INTO `doctor_schedule` (`id`, `uuid`, `created_at`, `created_id`, `user_id`, `day`, `time`, `updated_at`, `updated_id`, `status`) VALUES
(1, NULL, '2020-09-18 00:00:00', 1, 3, 'Segunda-Feira', '[{\"start_time\": \"08:00\", \"end_time\": \"09:00\"}, {\"start_time\": \"12:00\", \"end_time\": \"14:00\"}, {\"start_time\": \"18:00\", \"end_time\": \"20:00\"}]', NULL, NULL, 1),
(2, NULL, '2020-09-18 00:00:00', 1, 3, 'Terça-Feira', '[{\"start_time\": \"08:00\", \"end_time\": \"09:00\"}, {\"start_time\": \"12:00\", \"end_time\": \"14:00\"}]', NULL, NULL, 1),
(3, NULL, '2020-09-18 00:00:00', 1, 3, 'Quarta-Feira', '[{\"start_time\": \"08:00\", \"end_time\": \"09:00\"}]', NULL, NULL, 1),
(4, NULL, '2020-09-18 00:00:00', 1, 3, 'Quinta-Feira', '[{\"start_time\": \"12:00\", \"end_time\": \"14:00\"}, {\"start_time\": \"18:00\", \"end_time\": \"20:00\"}]', NULL, NULL, 1),
(5, NULL, '2020-09-18 00:00:00', 1, 3, 'Sexta-Feira', '[{\"start_time\": \"12:00\", \"end_time\": \"14:00\"}, {\"start_time\": \"18:00\", \"end_time\": \"20:00\"}]', NULL, NULL, 1),
(6, NULL, '2020-09-18 00:00:00', 1, 3, 'Sábado', '[{\"start_time\": \"08:00\", \"end_time\": \"09:00\"}]', NULL, NULL, 1),
(7, NULL, '2020-09-18 00:00:00', 1, 3, 'Domingo', '[{\"start_time\": \"08:00\", \"end_time\": \"09:00\"}, {\"start_time\": \"12:00\", \"end_time\": \"14:30\"}]', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `faq`
--

DROP TABLE IF EXISTS `faq`;
CREATE TABLE IF NOT EXISTS `faq` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `question` text,
  `updated_at` datetime DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `faq`
--

INSERT INTO `faq` (`id`, `uuid`, `created_at`, `created_id`, `question`, `updated_at`, `updated_id`, `status`) VALUES
(1, NULL, '2020-09-25 00:00:00', 1, 'Como contratar o plano ?', NULL, NULL, 1),
(2, NULL, '2020-09-25 00:00:00', 1, 'Pergunta', NULL, NULL, 1),
(3, NULL, '2020-09-25 00:00:00', 1, 'Pergunta 1', NULL, NULL, 1),
(4, NULL, '2020-09-25 00:00:00', 1, 'Pergunta 4', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `faq_answer`
--

DROP TABLE IF EXISTS `faq_answer`;
CREATE TABLE IF NOT EXISTS `faq_answer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `faq_id` int(11) DEFAULT NULL,
  `answer` text,
  `updated_at` datetime DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_faq` (`faq_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `faq_answer`
--

INSERT INTO `faq_answer` (`id`, `uuid`, `created_at`, `created_id`, `faq_id`, `answer`, `updated_at`, `updated_id`, `status`) VALUES
(1, NULL, '2020-09-25 00:00:00', 1, 1, 'contrate o melhor plano', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `health_problems`
--

DROP TABLE IF EXISTS `health_problems`;
CREATE TABLE IF NOT EXISTS `health_problems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` text,
  `updated_at` datetime DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `health_problems`
--

INSERT INTO `health_problems` (`id`, `uuid`, `created_at`, `created_id`, `title`, `description`, `updated_at`, `updated_id`, `status`) VALUES
(1, NULL, '2020-09-17 00:00:00', 1, 'Pressão Alta', NULL, NULL, NULL, 1),
(2, NULL, '2020-09-17 00:00:00', 1, 'Pressão Alta', NULL, NULL, NULL, 1),
(3, NULL, '2020-09-17 00:00:00', 1, 'Colesterol ALto', NULL, NULL, NULL, 1),
(4, NULL, '2020-09-17 00:00:00', 1, 'Diabetes', NULL, NULL, NULL, 1),
(5, NULL, '2020-09-17 00:00:00', 1, 'Doença Cardiaca', NULL, NULL, NULL, 1),
(6, NULL, '2020-09-17 00:00:00', 1, 'Doença no Pulmão', NULL, NULL, NULL, 1),
(7, NULL, '2020-09-17 00:00:00', 1, 'Doença no estômago ou intestino', NULL, NULL, NULL, 1),
(8, NULL, '2020-09-17 00:00:00', 1, 'Doença no Rim', NULL, NULL, NULL, 1),
(9, NULL, '2020-09-17 00:00:00', 1, 'Doença no FIgado', NULL, NULL, NULL, 1),
(10, NULL, '2020-09-17 00:00:00', 1, 'Cancêr Ativo', NULL, NULL, NULL, 1),
(11, NULL, '2020-09-17 00:00:00', 1, 'Doenças nas articulações (juntas)', NULL, NULL, NULL, 1),
(12, NULL, '2020-09-17 00:00:00', 1, 'Doença Celebral ou Neurológica', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `medical_record`
--

DROP TABLE IF EXISTS `medical_record`;
CREATE TABLE IF NOT EXISTS `medical_record` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `user_id_holder` bigint(20) UNSIGNED DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `profile` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `medical_record` text COLLATE utf8mb4_unicode_ci,
  `continuous_remedy` text COLLATE utf8mb4_unicode_ci,
  `medical_allergy_description` text COLLATE utf8mb4_unicode_ci,
  `pregnant` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `status` int(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_users_id_foreign_medical_record` (`user_id`),
  KEY `fk_users_id_holder_foreign_medical_record` (`user_id_holder`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `medical_record`
--

INSERT INTO `medical_record` (`id`, `uuid`, `created_at`, `created_id`, `user_id_holder`, `user_id`, `profile`, `medical_record`, `continuous_remedy`, `medical_allergy_description`, `pregnant`, `updated_at`, `updated_id`, `status`) VALUES
(1, '3b63f853-dba1-4103-83a9-6b4053d306fd', '2020-09-30 22:18:22', 6, 6, 1, 'Titular', NULL, 'remedio continuo', 'abc', 'pregnant', NULL, NULL, 1),
(2, '4bfc4804-eab6-423a-8dda-924db9c7408f', '2020-09-30 22:18:23', 6, 6, 1, 'Titular', NULL, 'remedio continuo', 'abc', 'pregnant', NULL, NULL, 1),
(3, '75c2e486-d5d0-44de-a1b6-45a9dc2b78a2', '2020-09-30 22:20:48', 6, 6, 6, 'Titular', NULL, 'remedio continuo', 'abc', 'pregnant', NULL, NULL, 1),
(5, '54a52d73-5768-46d9-b897-eb34066fec2a', '2020-09-30 22:21:49', 6, 6, 1, 'Titular', NULL, 'remedio continuo', 'abc', 'pregnant', NULL, NULL, 1),
(6, 'f96ca2b6-8526-4695-a3df-f043827a7d93', '2020-09-30 22:22:54', 6, 6, 6, 'Titular', NULL, 'remedio continuo', 'abc', 'pregnant', NULL, NULL, 1),
(7, '950574db-c2bf-4ca8-89fc-51fcddc4cc0e', '2020-09-30 22:23:23', 6, 6, 1, 'Dependente', NULL, 'remedio continuo', 'abc', 'pregnant', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `partners`
--

DROP TABLE IF EXISTS `partners`;
CREATE TABLE IF NOT EXISTS `partners` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `unit_id` int(11) DEFAULT NULL,
  `unit_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `complement` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip` varchar(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `neighborhood` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `longitude` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `partners`
--

INSERT INTO `partners` (`id`, `uuid`, `created_at`, `created_id`, `unit_id`, `unit_name`, `phone`, `street`, `number`, `complement`, `zip`, `neighborhood`, `city`, `state`, `zone`, `latitude`, `longitude`, `country`, `updated_at`, `updated_id`, `status`) VALUES
(1, '48d6389b-6ae3-4b50-b031-858c386365b5', '2020-09-18 00:00:00', 1, 118842, 'Shopping Praça da Moça (somente Teste de Anticorpos Coronavírus)', '11 11111111', 'R. Manoel da Nóbrega', '712', '', '09910720', 'Centro', 'São Paulo', 'SP', 'Centro', '-23.7027969', '-46.7779426', 'Brasil', NULL, NULL, 1),
(2, '48d3589b-6ae3-4b50-b031-857c386365b5', '2020-09-18 00:00:00', 1, 5797, 'Tatuapé', '11 22222222', 'Pç. Silvio Romero', '150', '', '03323000', 'Tatuapé', 'São Paulo', 'SP', 'Zona Leste', '', '', 'Brasil', NULL, NULL, 1),
(3, '48d3589b-6ae3-4b50-b031-858c386365b5', '2020-09-24 22:12:40', 1, 12345, 'teste', '11985409693', 'Rua', NULL, 'abc', '09280360', 'bairro', 'cidade', 'sp', 'zona leste', '-123456', '-123456', 'pais', NULL, NULL, 1),
(4, '9dba76d7-ccb4-4198-a4d3-e92e6ac26533', '2020-09-24 22:20:51', 1, 12345, 'teste', '11985409693', 'Rua', NULL, 'abc', '09280360', 'bairro', 'cidade', 'sp', 'zona leste', '-123456', '-123456', 'pais', NULL, NULL, 1),
(5, 'dee09f5c-16b3-4551-ac85-7e923c66423e', '2020-09-24 22:23:32', 1, 12345, 'teste', '11985409693', 'Rua', NULL, 'abc', '09280360', 'bairro', 'cidade', 'sp', 'zona leste', '-123456', '-123456', 'pais', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `payment`
--

DROP TABLE IF EXISTS `payment`;
CREATE TABLE IF NOT EXISTS `payment` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `reference_date` date DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `fine` decimal(10,2) DEFAULT NULL,
  `payment_type` int(1) DEFAULT NULL COMMENT '1=billet, 2=credit card',
  `payment_date` date DEFAULT NULL,
  `payment` int(1) DEFAULT NULL COMMENT '0=false, 1=true',
  `obs` text COLLATE utf8mb4_unicode_ci,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `status` int(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_users_id_foreign_payment` (`user_id`),
  KEY `fk_products_id_foreign_payment` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `permission`
--

DROP TABLE IF EXISTS `permission`;
CREATE TABLE IF NOT EXISTS `permission` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `details` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `permission_role`
--

DROP TABLE IF EXISTS `permission_role`;
CREATE TABLE IF NOT EXISTS `permission_role` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uui` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_id` int(11) UNSIGNED DEFAULT NULL,
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) UNSIGNED DEFAULT NULL,
  `status` tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `permission_role_permission_id_foreign` (`permission_id`),
  KEY `permission_role_role_id_foreign` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `personal_data`
--

DROP TABLE IF EXISTS `personal_data`;
CREATE TABLE IF NOT EXISTS `personal_data` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `user_id_holder` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `profile` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_birth` date DEFAULT NULL,
  `mother_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `height` decimal(10,2) DEFAULT NULL,
  `cellphone` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `national_registration` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `medical_record_user_id_foreign` (`user_id`),
  KEY `medical_record_user_id_holder_foreign` (`user_id_holder`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `personal_data`
--

INSERT INTO `personal_data` (`id`, `uuid`, `created_at`, `created_id`, `user_id_holder`, `user_id`, `profile`, `name`, `date_birth`, `mother_name`, `gender`, `weight`, `height`, `cellphone`, `national_registration`, `updated_at`, `updated_id`, `status`) VALUES
(1, 'b4a71079-766f-4754-89bd-32a557f47a5d', '2020-09-30 23:42:22', 6, 6, 6, NULL, 'titual', '2020-05-05', 'mae do titular', 'M', '1.85', '1.76', '11985409693', '11122233366', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `type` int(1) NOT NULL COMMENT '1=recorrencia; 2=transação',
  `payment_methods` int(1) DEFAULT NULL COMMENT '1= all, 2 = billet, 3 = credit_card',
  `billing_days` int(3) DEFAULT NULL COMMENT '30 dias, 60 dias',
  `amount` decimal(10,2) DEFAULT NULL,
  `billet` decimal(10,2) DEFAULT NULL,
  `fine` decimal(10,2) DEFAULT NULL,
  `term` text COLLATE utf8mb4_unicode_ci,
  `pagarme_plan_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `products`
--

INSERT INTO `products` (`id`, `uuid`, `created_at`, `created_id`, `title`, `description`, `type`, `payment_methods`, `billing_days`, `amount`, `billet`, `fine`, `term`, `pagarme_plan_id`, `updated_at`, `updated_id`, `status`) VALUES
(1, 'e6289g45-9f97-4eb9-9d32-56c8963bffa7', '2020-09-17 17:09:03', 1, 'Plano Mensal', 'Plano Mensal', 1, 3, 30, '19.90', NULL, '0.00', 'term term term', 503783, NULL, NULL, 1),
(4, 'e6289f23-9f97-4eb9-9d32-56c8963bffa7', '2020-09-28 13:49:41', 1, 'Plano Semestral', 'Plano Semestral', 2, 1, 180, '16.90', '101.04', '25.00', 'term term term', NULL, NULL, NULL, 1),
(5, '2c128ab7-7e1e-4b79-bdfc-860fd327d0d7', '2020-09-28 13:50:20', 1, 'Plano Anual', 'Plano Anual', 2, 1, 365, '14.90', '178.80', '25.00', 'term term term', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uui` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `details` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `role`
--

INSERT INTO `role` (`id`, `uui`, `created_at`, `created_id`, `name`, `details`, `updated_at`, `updated_id`, `status`) VALUES
(1, NULL, '2020-09-17 03:00:00', 1, 'Administrador', NULL, NULL, NULL, NULL),
(2, NULL, '2020-09-17 03:00:00', 1, 'Medico', NULL, NULL, NULL, NULL),
(3, NULL, '2020-09-17 03:00:00', 1, 'Titutal', NULL, NULL, NULL, NULL),
(4, NULL, '2020-09-17 03:00:00', 1, 'Dependente', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `role_user`
--

DROP TABLE IF EXISTS `role_user`;
CREATE TABLE IF NOT EXISTS `role_user` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL COMMENT '1=admin, 2=medico, 3-titular, 4 =dependente',
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `status` int(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `role_user_user_id_foreign` (`user_id`),
  KEY `role_user_role_id_foreign` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `token`
--

DROP TABLE IF EXISTS `token`;
CREATE TABLE IF NOT EXISTS `token` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `uuid` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `token` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_token` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tutorials`
--

DROP TABLE IF EXISTS `tutorials`;
CREATE TABLE IF NOT EXISTS `tutorials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `published` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tutorials`
--

INSERT INTO `tutorials` (`id`, `title`, `description`, `published`, `createdAt`, `updatedAt`) VALUES
(1, 'title 1', 'description 1', 0, '2020-09-17 00:00:00', '2020-09-17 00:00:00'),
(2, 'title 2', 'description 2', 0, '2020-09-17 00:00:00', '2020-09-17 00:00:00'),
(3, 'title 3', 'description 4', 0, '2020-09-17 00:00:00', '2020-09-17 00:00:00'),
(4, 'title 4', 'description 4', 0, '2020-09-17 00:00:00', '2020-09-17 00:00:00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_id` int(5) DEFAULT NULL,
  `companie_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `document` varchar(14) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `api_token` text COLLATE utf8mb4_unicode_ci,
  `online_date` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `validation_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `img` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(5) DEFAULT NULL,
  `created_password` int(11) DEFAULT NULL,
  `change_password` date DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `uuid`, `created_at`, `created_id`, `companie_id`, `name`, `document`, `email`, `email_verified_at`, `api_token`, `online_date`, `password`, `remember_token`, `validation_token`, `type`, `img`, `updated_at`, `updated_id`, `created_password`, `change_password`, `status`) VALUES
(1, '', '2020-09-17 03:00:00', 1, 0, 'Admistrador', NULL, 'admin@gmail.com', NULL, NULL, NULL, '$2b$10$nuRWLHqb/m/6ufuOv8UQxOl4yEH3rnMGVf324XuNwC2b2njLKptEC', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 1),
(2, '', '2020-09-17 03:00:00', 1, 0, 'Titular', NULL, 'titular@gmail.com', NULL, NULL, NULL, '$2b$10$nuRWLHqb/m/6ufuOv8UQxOl4yEH3rnMGVf324XuNwC2b2njLKptEC', NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, 1),
(3, '', '2020-09-17 03:00:00', 1, 0, 'Medico', NULL, 'medico@gmail.com', NULL, NULL, NULL, '$2b$10$nuRWLHqb/m/6ufuOv8UQxOl4yEH3rnMGVf324XuNwC2b2njLKptEC', NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, 1),
(4, '', '2020-09-17 03:00:00', 1, 0, 'Dependente', NULL, 'dependente@gmail.com', NULL, NULL, NULL, '$2b$10$nuRWLHqb/m/6ufuOv8UQxOl4yEH3rnMGVf324XuNwC2b2njLKptEC', NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, 1),
(5, 'b6c5234d-7b35-424a-8f1a-f5322219d9e7', NULL, NULL, NULL, 'Eduardo Olimpio de Oliveira', NULL, 'eduolioli@gmail.com', NULL, NULL, NULL, '$2b$10$bfuTl1.LCMJiacNXLEMgBurryjeTDhcEfbZQm9MIse3QEYe8X.XfO', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 1),
(6, '5ef227b3-a3cf-4622-bb0b-9386d1d0f06a', NULL, NULL, NULL, 'Eduardo Olimpio de Oliveira', NULL, 'eduardo.oliveira@gok.digital', NULL, NULL, NULL, '$2b$10$lByvIh.QJ.BAqaoXUWwEE.fUbEj0YRS/zKuSsWcWfAGGyQcioVqkG', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 1),
(7, 'ccc86fb1-6c9b-45d1-b198-653af283a0bd', NULL, NULL, NULL, 'Guilherme Ramos', NULL, 'guilhermeht.ramos@gmail.com', NULL, NULL, NULL, '$2b$10$Kpj3sFlsw/K0UOpK6LcDyukGR5ejQKqvYAgtwJlab5x6uh5W9Sq.u', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 1),
(8, '420fe1e8-b025-4137-897f-e3914648e662', NULL, NULL, NULL, NULL, NULL, 'guilhermeht.ramos@gmail.comj', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1),
(9, '0fc74093-9b82-4c62-84be-c299b4bd267d', NULL, NULL, NULL, NULL, NULL, 'guilhermeht.ramos@gmail.comh', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1),
(10, '67752506-0feb-426c-8b42-9685d0c8a3ef', NULL, NULL, NULL, NULL, NULL, 'guilhermeht.ramos@gmail.comf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1),
(11, '03120d3a-0c49-40f3-b012-558138ab7881', NULL, NULL, NULL, NULL, NULL, 'guilhermeht.ramos@gmail.comg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1),
(12, '80042654-3acb-4419-a578-79b9b407d989', NULL, NULL, NULL, NULL, NULL, 'guilhermeht.ramos@gmail.comp', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1),
(13, 'e779d11d-bccb-4d10-bcce-6815324a04f5', NULL, NULL, NULL, NULL, NULL, 'guilhermeht.ramos@gmail.comcv', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `userss`
--

DROP TABLE IF EXISTS `userss`;
CREATE TABLE IF NOT EXISTS `userss` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_id` int(5) DEFAULT NULL,
  `companie_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `document` varchar(14) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `api_token` text COLLATE utf8mb4_unicode_ci,
  `online_date` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `validation_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `img` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(5) DEFAULT NULL,
  `first_login` int(11) DEFAULT NULL,
  `change_password` date DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `userss`
--

INSERT INTO `userss` (`id`, `uuid`, `created_at`, `created_id`, `companie_id`, `name`, `document`, `email`, `email_verified_at`, `api_token`, `online_date`, `password`, `remember_token`, `validation_token`, `type`, `img`, `updated_at`, `updated_id`, `first_login`, `change_password`, `status`) VALUES
(1, '', '2020-09-17 03:00:00', 1, 0, 'Admistrador', NULL, 'admin@gmail.com', NULL, NULL, NULL, '$2b$10$nuRWLHqb/m/6ufuOv8UQxOl4yEH3rnMGVf324XuNwC2b2njLKptEC', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 1),
(2, '', '2020-09-17 03:00:00', 1, 0, 'Titular', NULL, 'titular@gmail.com', NULL, NULL, NULL, '$2b$10$nuRWLHqb/m/6ufuOv8UQxOl4yEH3rnMGVf324XuNwC2b2njLKptEC', NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, 1),
(3, '', '2020-09-17 03:00:00', 1, 0, 'Medico', NULL, 'medico@gmail.com', NULL, NULL, NULL, '$2b$10$nuRWLHqb/m/6ufuOv8UQxOl4yEH3rnMGVf324XuNwC2b2njLKptEC', NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, 1),
(4, '', '2020-09-17 03:00:00', 1, 0, 'Dependente', NULL, 'dependente@gmail.com', NULL, NULL, NULL, '$2b$10$nuRWLHqb/m/6ufuOv8UQxOl4yEH3rnMGVf324XuNwC2b2njLKptEC', NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `users_products`
--

DROP TABLE IF EXISTS `users_products`;
CREATE TABLE IF NOT EXISTS `users_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `created_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `products_id` int(2) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `users_products`
--

INSERT INTO `users_products` (`id`, `uuid`, `created_at`, `created_id`, `user_id`, `products_id`, `updated_at`, `updated_id`, `status`) VALUES
(1, NULL, '2020-09-17 00:00:00', 1, 2, 1, NULL, NULL, 1);

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `faq_answer`
--
ALTER TABLE `faq_answer`
  ADD CONSTRAINT `fk_faq` FOREIGN KEY (`faq_id`) REFERENCES `faq` (`id`);

--
-- Limitadores para a tabela `medical_record`
--
ALTER TABLE `medical_record`
  ADD CONSTRAINT `fk_users_id_foreign_medical_record` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_users_id_holder_foreign_medical_record` FOREIGN KEY (`user_id_holder`) REFERENCES `users` (`id`);

--
-- Limitadores para a tabela `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `fk_products_id_foreign_payment` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `fk_users_id_foreign_payment` FOREIGN KEY (`user_id`) REFERENCES `userss` (`id`);

--
-- Limitadores para a tabela `permission_role`
--
ALTER TABLE `permission_role`
  ADD CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`),
  ADD CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

--
-- Limitadores para a tabela `personal_data`
--
ALTER TABLE `personal_data`
  ADD CONSTRAINT `medical_record_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `medical_record_user_id_holder_foreign` FOREIGN KEY (`user_id_holder`) REFERENCES `users` (`id`);

--
-- Limitadores para a tabela `role_user`
--
ALTER TABLE `role_user`
  ADD CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `userss` (`id`);

--
-- Limitadores para a tabela `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `fk_token` FOREIGN KEY (`user_id`) REFERENCES `userss` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
