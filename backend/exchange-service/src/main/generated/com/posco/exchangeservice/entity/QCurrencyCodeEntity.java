package com.posco.exchangeservice.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCurrencyCodeEntity is a Querydsl query type for CurrencyCodeEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCurrencyCodeEntity extends EntityPathBase<CurrencyCodeEntity> {

    private static final long serialVersionUID = 496040533L;

    public static final QCurrencyCodeEntity currencyCodeEntity = new QCurrencyCodeEntity("currencyCodeEntity");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final StringPath country = createString("country");

    //inherited
    public final StringPath createdBy = _super.createdBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final StringPath currCode = createString("currCode");

    public final StringPath currName = createString("currName");

    //inherited
    public final StringPath lastUpdatedBy = _super.lastUpdatedBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUpdatedDate = _super.lastUpdatedDate;

    public QCurrencyCodeEntity(String variable) {
        super(CurrencyCodeEntity.class, forVariable(variable));
    }

    public QCurrencyCodeEntity(Path<? extends CurrencyCodeEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCurrencyCodeEntity(PathMetadata metadata) {
        super(CurrencyCodeEntity.class, metadata);
    }

}

