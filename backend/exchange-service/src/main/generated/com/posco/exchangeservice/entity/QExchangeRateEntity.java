package com.posco.exchangeservice.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QExchangeRateEntity is a Querydsl query type for ExchangeRateEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QExchangeRateEntity extends EntityPathBase<ExchangeRateEntity> {

    private static final long serialVersionUID = -2035808614L;

    public static final QExchangeRateEntity exchangeRateEntity = new QExchangeRateEntity("exchangeRateEntity");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final StringPath createdBy = _super.createdBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> exchangeId = createNumber("exchangeId", Long.class);

    public final NumberPath<Float> exchangeRate = createNumber("exchangeRate", Float.class);

    public final StringPath fromCurr = createString("fromCurr");

    //inherited
    public final StringPath lastUpdatedBy = _super.lastUpdatedBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUpdatedDate = _super.lastUpdatedDate;

    public final DatePath<java.time.LocalDate> rateDate = createDate("rateDate", java.time.LocalDate.class);

    public final StringPath rateType = createString("rateType");

    public final StringPath toCurr = createString("toCurr");

    public QExchangeRateEntity(String variable) {
        super(ExchangeRateEntity.class, forVariable(variable));
    }

    public QExchangeRateEntity(Path<? extends ExchangeRateEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QExchangeRateEntity(PathMetadata metadata) {
        super(ExchangeRateEntity.class, metadata);
    }

}

