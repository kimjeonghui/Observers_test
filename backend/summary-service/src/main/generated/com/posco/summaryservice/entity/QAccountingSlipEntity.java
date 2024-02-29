package com.posco.summaryservice.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAccountingSlipEntity is a Querydsl query type for AccountingSlipEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAccountingSlipEntity extends EntityPathBase<AccountingSlipEntity> {

    private static final long serialVersionUID = -847298657L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAccountingSlipEntity accountingSlipEntity = new QAccountingSlipEntity("accountingSlipEntity");

    public final StringPath account = createString("account");

    public final QAccountingSlipInvoiceNumEntity accountingSlipInvoiceNumEntity;

    public final NumberPath<Long> accountSlipId = createNumber("accountSlipId", Long.class);

    public final NumberPath<java.math.BigDecimal> amount = createNumber("amount", java.math.BigDecimal.class);

    public final StringPath currCode = createString("currCode");

    public final StringPath description = createString("description");

    public final NumberPath<Long> drCr = createNumber("drCr", Long.class);

    public final NumberPath<Float> exchangeRate = createNumber("exchangeRate", Float.class);

    public final StringPath invoiceNum = createString("invoiceNum");

    public final NumberPath<java.math.BigDecimal> krwAmount = createNumber("krwAmount", java.math.BigDecimal.class);

    public final StringPath ovsCd = createString("ovsCd");

    public final StringPath tranCd = createString("tranCd");

    public final NumberPath<Long> tranNum = createNumber("tranNum", Long.class);

    public final DateTimePath<java.time.LocalDateTime> txDate = createDateTime("txDate", java.time.LocalDateTime.class);

    public QAccountingSlipEntity(String variable) {
        this(AccountingSlipEntity.class, forVariable(variable), INITS);
    }

    public QAccountingSlipEntity(Path<? extends AccountingSlipEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAccountingSlipEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAccountingSlipEntity(PathMetadata metadata, PathInits inits) {
        this(AccountingSlipEntity.class, metadata, inits);
    }

    public QAccountingSlipEntity(Class<? extends AccountingSlipEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.accountingSlipInvoiceNumEntity = inits.isInitialized("accountingSlipInvoiceNumEntity") ? new QAccountingSlipInvoiceNumEntity(forProperty("accountingSlipInvoiceNumEntity"), inits.get("accountingSlipInvoiceNumEntity")) : null;
    }

}

